/**
 Copyright 2021 Forestry.io Holdings, Inc.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

import {
  FilesystemBridge,
  FilesystemStore,
  IsomorphicBridge,
  LevelStore,
} from '@tinacms/datalayer'
import { buildSchema, createDatabase } from '@tinacms/graphql'
import { compileSchema, resetGeneratedFolder } from '../compile'

import { AsyncLock } from './lock'
import { Telemetry } from '@tinacms/metrics'
import chalk from 'chalk'

import chokidar from 'chokidar'
import { dangerText } from '../../utils/theme'
import { genTypes } from '../query-gen'
import { handleServerErrors } from './errors'
import { logger } from '../../logger'

import fs from 'fs-extra'
import ini from 'ini'
import os from 'os'
import path from 'path'

const lock = new AsyncLock()
interface Options {
  port?: number
  command?: string
  watchFolders?: string[]
  experimentalData?: boolean
  isomorphicGitBridge?: boolean
  noWatch?: boolean
  noSDK: boolean
  noTelemetry: boolean
  verbose?: boolean
  dev?: boolean
}

const gqlPackageFile = require.resolve('@tinacms/graphql')

const resolveGitRoot = async () => {
  const pathParts = process.cwd().split(path.sep)
  while (true) {
    const pathToGit = pathParts.join(path.sep)
    if (await fs.pathExists(path.join(pathToGit, '.git'))) {
      return pathToGit
    }

    if (!pathParts.length) {
      throw new Error(
        'Unable to locate your .git folder (required for isomorphicGitBridge)'
      )
    }
    pathParts.pop()
  }
}

async function makeIsomorphicOptions(fsBridge: FilesystemBridge) {
  const gitRoot = await resolveGitRoot()
  const options = {
    gitRoot,
    author: {
      name: '',
      email: '',
    },
    onPut: async (filepath: string, data: string) => {
      await fsBridge.put(filepath, data)
    },
    onDelete: async (filepath: string) => {
      await fsBridge.delete(filepath)
    },
  }

  const userGitConfig = `${os.homedir()}${path.sep}.gitconfig`
  if (await fs.pathExists(userGitConfig)) {
    const config = ini.parse(await fs.readFile(userGitConfig, 'utf-8'))
    if (config['user']?.['name']) {
      options.author.name = config['user']['name']
    }
    if (config['user']?.['email']) {
      options.author.email = config['user']['email']
    }
  }

  let repoGitConfig = undefined
  if (!options.author.name) {
    repoGitConfig = ini.parse(
      await fs.readFile(`${gitRoot}/.git/config`, 'utf-8')
    )
    if (repoGitConfig['user']?.['name']) {
      options.author.name = repoGitConfig['user']['name']
    }

    if (!options.author.name) {
      throw new Error(
        'Unable to determine user.name from git config. Hint: `git config --global user.name "John Doe"`'
      )
    }
  }

  if (!options.author.email) {
    repoGitConfig =
      repoGitConfig ||
      ini.parse(await fs.readFile(`${gitRoot}/.git/config`, 'utf-8'))

    if (repoGitConfig['user']?.['email']) {
      options.author.email = repoGitConfig['user']['email']
    }

    if (!options.author.email) {
      throw new Error(
        'Unable to determine user.email from git config. Hint: `git config --global user.email johndoe@example.com`'
      )
    }
  }
  return options
}

export async function startServer(
  _ctx,
  next,
  {
    port = 4001,
    noWatch,
    experimentalData,
    isomorphicGitBridge,
    noSDK,
    noTelemetry,
    watchFolders,
    verbose,
    dev,
  }: Options
) {
  lock.disable()

  const rootPath = process.cwd()
  const t = new Telemetry({ disabled: Boolean(noTelemetry) })
  t.submitRecord({
    event: {
      name: 'tinacms:cli:server:start:invoke',
    },
  })

  const fsBridge = new FilesystemBridge(rootPath)
  const isomorphicOptions =
    isomorphicGitBridge && (await makeIsomorphicOptions(fsBridge))

  /**
   * To work with Github directly, replace the Bridge and Store
   * and ensure you've provided your access token.
   * NOTE: when talking the the tinacms repo, you must
   * give your personal access token access to the TinaCMS org
   */
  // const ghConfig = {
  //   rootPath: 'examples/tina-cloud-starter',
  //   accessToken: '<my-token>',
  //   owner: 'tinacms',
  //   repo: 'tinacms',
  //   ref: 'add-data-store',
  // }
  // const bridge = new GithubBridge(ghConfig)
  // const store = new GithubStore(ghConfig)

  if (!process.env.CI && !noWatch) {
    await resetGeneratedFolder()
  }

  const bridge = isomorphicGitBridge
    ? new IsomorphicBridge(rootPath, isomorphicOptions)
    : fsBridge

  const store = experimentalData
    ? new LevelStore(rootPath)
    : new FilesystemStore({ rootPath })
  const shouldBuild = bridge.supportsBuilding()

  const database = await createDatabase({ store, bridge })

  let ready = false

  const build = async (noSDK?: boolean) => {
    // Clear the cache of the DB passed to the GQL server
    database.clearCache()
    // Wait for the lock to be disabled
    await lock.promise
    // Enable the lock so that no two builds can happen at once
    lock.enable()
    try {
      if (!process.env.CI && !noWatch) {
        await store.close()
        await resetGeneratedFolder()
        await store.open()
      }
      const cliFlags = []
      if (isomorphicGitBridge) {
        cliFlags.push('isomorphicGitBridge')
      }
      const database = await createDatabase({ store, bridge })
      await compileSchema(null, null, { verbose, dev })
      const schema = await buildSchema(rootPath, database, cliFlags)
      await genTypes({ schema }, () => {}, { noSDK, verbose })
    } catch (error) {
      throw error
    } finally {
      // Disable the lock so a new build can run
      lock.disable()
    }
  }

  const foldersToWatch = (watchFolders || []).map((x) => path.join(rootPath, x))
  if (!noWatch && !process.env.CI) {
    chokidar
      .watch(
        [
          ...foldersToWatch,
          `${rootPath}/.tina/**/*.{ts,gql,graphql,js,tsx,jsx}`,
        ],
        {
          ignored: [
            '**/node_modules/**/*',
            '**/.next/**/*',
            `${path.resolve(rootPath)}/.tina/__generated__/**/*`,
          ],
        }
      )
      .on('ready', async () => {
        if (verbose) console.log('Generating Tina config')
        try {
          if (shouldBuild) {
            await build(noSDK)
          }
          ready = true
          next()
        } catch (e) {
          handleServerErrors(e)
          // FIXME: make this a debug flag
          console.log(e)
          process.exit(0)
        }
      })
      .on('all', async () => {
        if (ready) {
          logger.info('Tina change detected, regenerating config')
          try {
            if (shouldBuild) {
              await build(noSDK)
            }
            if (isReady) {
              await restart()
            }
          } catch (e) {
            handleServerErrors(e)
            t.submitRecord({
              event: {
                name: 'tinacms:cli:server:error',
                errorMessage: e.message,
              },
            })
          }
        }
      })
  } else {
    if (shouldBuild) {
      await build(noSDK)
    }
  }

  const state = {
    server: null,
    sockets: [],
  }

  let isReady = false

  const start = async () => {
    // we do not want to start the server while the schema is building
    await lock.promise
    const s = require('./server')
    state.server = await s.default(database)

    state.server.listen(port, () => {
      const altairUrl = `http://localhost:${port}/altair/`
      const cmsUrl = `[your-development-url]/admin`
      if (verbose)
        logger.info(`Started Filesystem GraphQL server on port: ${port}`)
      logger.info(
        `Visit the GraphQL playground at ${chalk.underline.blueBright(
          altairUrl
        )}\nor`
      )
      logger.info(`Enter the CMS at ${chalk.underline.blueBright(cmsUrl)} \n`)
    })
    state.server.on('error', function (e) {
      if (e.code === 'EADDRINUSE') {
        logger.error(dangerText(`Port 4001 already in use`))
        process.exit()
      }
      throw e
    })
    state.server.on('connection', (socket) => {
      state.sockets.push(socket)
    })
  }

  const restart = async () => {
    logger.info('restarting local server...')
    delete require.cache[gqlPackageFile]

    state.sockets.forEach((socket) => {
      if (socket.destroyed === false) {
        socket.destroy()
      }
    })
    state.sockets = []
    state.server.close(() => {
      logger.info('Server closed')
      start()
    })
  }

  if (!noWatch && !process.env.CI) {
    chokidar
      .watch([gqlPackageFile])
      .on('ready', async () => {
        isReady = true
        start()
      })
      .on('all', async () => {
        if (isReady) {
          restart()
        }
      })
  } else {
    if (process.env.CI) {
      logger.info('Detected CI environment, omitting watch commands...')
    }
    start()
    next()
  }
}
