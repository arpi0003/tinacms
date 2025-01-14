//@ts-nocheck
// DO NOT MODIFY THIS FILE. This file is automatically generated by Tina
import { gql } from 'tinacms';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** References another document, used as a foreign key */
  Reference: any;
  JSON: any;
};

export type SystemInfo = {
  __typename?: 'SystemInfo';
  filename: Scalars['String'];
  basename: Scalars['String'];
  breadcrumbs: Array<Scalars['String']>;
  path: Scalars['String'];
  relativePath: Scalars['String'];
  extension: Scalars['String'];
  template: Scalars['String'];
  collection: Collection;
};


export type SystemInfoBreadcrumbsArgs = {
  excludeExtension?: Maybe<Scalars['Boolean']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasPreviousPage: Scalars['Boolean'];
  hasNextPage: Scalars['Boolean'];
  startCursor: Scalars['String'];
  endCursor: Scalars['String'];
};

export type Node = {
  id: Scalars['ID'];
};

export type Document = {
  id: Scalars['ID'];
  _sys?: Maybe<SystemInfo>;
  _values: Scalars['JSON'];
};

/** A relay-compliant pagination connection */
export type Connection = {
  totalCount: Scalars['Float'];
  pageInfo: PageInfo;
};

export type Query = {
  __typename?: 'Query';
  getOptimizedQuery?: Maybe<Scalars['String']>;
  collection: Collection;
  collections: Array<Collection>;
  node: Node;
  document: DocumentNode;
  post: Post;
  postConnection: PostConnection;
  author: Author;
  authorConnection: AuthorConnection;
  blockPage: BlockPage;
  blockPageConnection: BlockPageConnection;
};


export type QueryGetOptimizedQueryArgs = {
  queryString: Scalars['String'];
};


export type QueryCollectionArgs = {
  collection?: Maybe<Scalars['String']>;
};


export type QueryNodeArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryDocumentArgs = {
  collection?: Maybe<Scalars['String']>;
  relativePath?: Maybe<Scalars['String']>;
};


export type QueryPostArgs = {
  relativePath?: Maybe<Scalars['String']>;
};


export type QueryPostConnectionArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Float']>;
  last?: Maybe<Scalars['Float']>;
  sort?: Maybe<Scalars['String']>;
};


export type QueryAuthorArgs = {
  relativePath?: Maybe<Scalars['String']>;
};


export type QueryAuthorConnectionArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Float']>;
  last?: Maybe<Scalars['Float']>;
  sort?: Maybe<Scalars['String']>;
};


export type QueryBlockPageArgs = {
  relativePath?: Maybe<Scalars['String']>;
};


export type QueryBlockPageConnectionArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Float']>;
  last?: Maybe<Scalars['Float']>;
  sort?: Maybe<Scalars['String']>;
};

export type DocumentConnectionEdges = {
  __typename?: 'DocumentConnectionEdges';
  cursor: Scalars['String'];
  node?: Maybe<DocumentNode>;
};

export type DocumentConnection = Connection & {
  __typename?: 'DocumentConnection';
  pageInfo: PageInfo;
  totalCount: Scalars['Float'];
  edges?: Maybe<Array<Maybe<DocumentConnectionEdges>>>;
};

export type Collection = {
  __typename?: 'Collection';
  name: Scalars['String'];
  slug: Scalars['String'];
  label?: Maybe<Scalars['String']>;
  path: Scalars['String'];
  format?: Maybe<Scalars['String']>;
  matches?: Maybe<Scalars['String']>;
  templates?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  fields?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  documents: DocumentConnection;
};


export type CollectionDocumentsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Float']>;
  last?: Maybe<Scalars['Float']>;
  sort?: Maybe<Scalars['String']>;
};

export type DocumentNode = Post | Author | BlockPage;

export type PostAuthor = Author;

export type Post = Node & Document & {
  __typename?: 'Post';
  title?: Maybe<Scalars['String']>;
  author?: Maybe<PostAuthor>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  categories?: Maybe<Array<Maybe<Scalars['String']>>>;
  published?: Maybe<Scalars['String']>;
  featured?: Maybe<Scalars['Boolean']>;
  body?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
  _sys: SystemInfo;
  _values: Scalars['JSON'];
};

export type PostConnectionEdges = {
  __typename?: 'PostConnectionEdges';
  cursor: Scalars['String'];
  node?: Maybe<Post>;
};

export type PostConnection = Connection & {
  __typename?: 'PostConnection';
  pageInfo: PageInfo;
  totalCount: Scalars['Float'];
  edges?: Maybe<Array<Maybe<PostConnectionEdges>>>;
};

export type AuthorSocial = {
  __typename?: 'AuthorSocial';
  platform?: Maybe<Scalars['String']>;
  handle?: Maybe<Scalars['String']>;
};

export type Author = Node & Document & {
  __typename?: 'Author';
  name?: Maybe<Scalars['String']>;
  social?: Maybe<Array<Maybe<AuthorSocial>>>;
  bio?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
  _sys: SystemInfo;
  _values: Scalars['JSON'];
};

export type AuthorConnectionEdges = {
  __typename?: 'AuthorConnectionEdges';
  cursor: Scalars['String'];
  node?: Maybe<Author>;
};

export type AuthorConnection = Connection & {
  __typename?: 'AuthorConnection';
  pageInfo: PageInfo;
  totalCount: Scalars['Float'];
  edges?: Maybe<Array<Maybe<AuthorConnectionEdges>>>;
};

export type BlockPageBlocksHero = {
  __typename?: 'BlockPageBlocksHero';
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type BlockPageBlocksBlockQuoteAuthor = Author;

export type BlockPageBlocksBlockQuote = {
  __typename?: 'BlockPageBlocksBlockQuote';
  message?: Maybe<Scalars['JSON']>;
  author?: Maybe<BlockPageBlocksBlockQuoteAuthor>;
};

export type BlockPageBlocksFeaturedPostsBlogsItem = Post;

export type BlockPageBlocksFeaturedPostsBlogs = {
  __typename?: 'BlockPageBlocksFeaturedPostsBlogs';
  item?: Maybe<BlockPageBlocksFeaturedPostsBlogsItem>;
};

export type BlockPageBlocksFeaturedPosts = {
  __typename?: 'BlockPageBlocksFeaturedPosts';
  header?: Maybe<Scalars['String']>;
  blogs?: Maybe<Array<Maybe<BlockPageBlocksFeaturedPostsBlogs>>>;
};

export type BlockPageBlocksFeatureListItems = {
  __typename?: 'BlockPageBlocksFeatureListItems';
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type BlockPageBlocksFeatureList = {
  __typename?: 'BlockPageBlocksFeatureList';
  title?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<BlockPageBlocksFeatureListItems>>>;
};

export type BlockPageBlocksSlideshowItems = {
  __typename?: 'BlockPageBlocksSlideshowItems';
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type BlockPageBlocksSlideshow = {
  __typename?: 'BlockPageBlocksSlideshow';
  title?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<BlockPageBlocksSlideshowItems>>>;
};

export type BlockPageBlocks = BlockPageBlocksHero | BlockPageBlocksBlockQuote | BlockPageBlocksFeaturedPosts | BlockPageBlocksFeatureList | BlockPageBlocksSlideshow;

export type BlockPage = Node & Document & {
  __typename?: 'BlockPage';
  title?: Maybe<Scalars['String']>;
  blocks?: Maybe<Array<Maybe<BlockPageBlocks>>>;
  id: Scalars['ID'];
  _sys: SystemInfo;
  _values: Scalars['JSON'];
};

export type BlockPageConnectionEdges = {
  __typename?: 'BlockPageConnectionEdges';
  cursor: Scalars['String'];
  node?: Maybe<BlockPage>;
};

export type BlockPageConnection = Connection & {
  __typename?: 'BlockPageConnection';
  pageInfo: PageInfo;
  totalCount: Scalars['Float'];
  edges?: Maybe<Array<Maybe<BlockPageConnectionEdges>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addPendingDocument: DocumentNode;
  updateDocument: DocumentNode;
  deleteDocument: DocumentNode;
  createDocument: DocumentNode;
  updatePost: Post;
  createPost: Post;
  updateAuthor: Author;
  createAuthor: Author;
  updateBlockPage: BlockPage;
  createBlockPage: BlockPage;
};


export type MutationAddPendingDocumentArgs = {
  collection: Scalars['String'];
  relativePath: Scalars['String'];
  template?: Maybe<Scalars['String']>;
};


export type MutationUpdateDocumentArgs = {
  collection?: Maybe<Scalars['String']>;
  relativePath: Scalars['String'];
  params: DocumentMutation;
};


export type MutationDeleteDocumentArgs = {
  collection?: Maybe<Scalars['String']>;
  relativePath: Scalars['String'];
};


export type MutationCreateDocumentArgs = {
  collection?: Maybe<Scalars['String']>;
  relativePath: Scalars['String'];
  params: DocumentMutation;
};


export type MutationUpdatePostArgs = {
  relativePath: Scalars['String'];
  params: PostMutation;
};


export type MutationCreatePostArgs = {
  relativePath: Scalars['String'];
  params: PostMutation;
};


export type MutationUpdateAuthorArgs = {
  relativePath: Scalars['String'];
  params: AuthorMutation;
};


export type MutationCreateAuthorArgs = {
  relativePath: Scalars['String'];
  params: AuthorMutation;
};


export type MutationUpdateBlockPageArgs = {
  relativePath: Scalars['String'];
  params: BlockPageMutation;
};


export type MutationCreateBlockPageArgs = {
  relativePath: Scalars['String'];
  params: BlockPageMutation;
};

export type DocumentMutation = {
  post?: Maybe<PostMutation>;
  author?: Maybe<AuthorMutation>;
  blockPage?: Maybe<BlockPageMutation>;
};

export type PostMutation = {
  title?: Maybe<Scalars['String']>;
  author?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  categories?: Maybe<Array<Maybe<Scalars['String']>>>;
  published?: Maybe<Scalars['String']>;
  featured?: Maybe<Scalars['Boolean']>;
  body?: Maybe<Scalars['JSON']>;
};

export type AuthorSocialMutation = {
  platform?: Maybe<Scalars['String']>;
  handle?: Maybe<Scalars['String']>;
};

export type AuthorMutation = {
  name?: Maybe<Scalars['String']>;
  social?: Maybe<Array<Maybe<AuthorSocialMutation>>>;
  bio?: Maybe<Scalars['JSON']>;
};

export type BlockPageBlocksHeroMutation = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type BlockPageBlocksBlockQuoteMutation = {
  message?: Maybe<Scalars['JSON']>;
  author?: Maybe<Scalars['String']>;
};

export type BlockPageBlocksFeaturedPostsBlogsMutation = {
  item?: Maybe<Scalars['String']>;
};

export type BlockPageBlocksFeaturedPostsMutation = {
  header?: Maybe<Scalars['String']>;
  blogs?: Maybe<Array<Maybe<BlockPageBlocksFeaturedPostsBlogsMutation>>>;
};

export type BlockPageBlocksFeatureListItemsMutation = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type BlockPageBlocksFeatureListMutation = {
  title?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<BlockPageBlocksFeatureListItemsMutation>>>;
};

export type BlockPageBlocksSlideshowItemsMutation = {
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type BlockPageBlocksSlideshowMutation = {
  title?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<BlockPageBlocksSlideshowItemsMutation>>>;
};

export type BlockPageBlocksMutation = {
  hero?: Maybe<BlockPageBlocksHeroMutation>;
  blockQuote?: Maybe<BlockPageBlocksBlockQuoteMutation>;
  featuredPosts?: Maybe<BlockPageBlocksFeaturedPostsMutation>;
  featureList?: Maybe<BlockPageBlocksFeatureListMutation>;
  slideshow?: Maybe<BlockPageBlocksSlideshowMutation>;
};

export type BlockPageMutation = {
  title?: Maybe<Scalars['String']>;
  blocks?: Maybe<Array<Maybe<BlockPageBlocksMutation>>>;
};

export type PostPartsFragment = { __typename?: 'Post', title?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, categories?: Maybe<Array<Maybe<string>>>, published?: Maybe<string>, featured?: Maybe<boolean>, body?: Maybe<any>, author?: Maybe<{ __typename?: 'Author', id: string }> };

export type AuthorPartsFragment = { __typename?: 'Author', name?: Maybe<string>, bio?: Maybe<any>, social?: Maybe<Array<Maybe<{ __typename: 'AuthorSocial', platform?: Maybe<string>, handle?: Maybe<string> }>>> };

export type BlockPagePartsFragment = { __typename?: 'BlockPage', title?: Maybe<string>, blocks?: Maybe<Array<Maybe<{ __typename: 'BlockPageBlocksHero', title?: Maybe<string>, description?: Maybe<string> } | { __typename: 'BlockPageBlocksBlockQuote', message?: Maybe<any>, author?: Maybe<{ __typename?: 'Author', id: string }> } | { __typename: 'BlockPageBlocksFeaturedPosts', header?: Maybe<string>, blogs?: Maybe<Array<Maybe<{ __typename: 'BlockPageBlocksFeaturedPostsBlogs', item?: Maybe<{ __typename?: 'Post', id: string }> }>>> } | { __typename: 'BlockPageBlocksFeatureList', title?: Maybe<string>, items?: Maybe<Array<Maybe<{ __typename: 'BlockPageBlocksFeatureListItems', title?: Maybe<string>, description?: Maybe<string> }>>> } | { __typename: 'BlockPageBlocksSlideshow', title?: Maybe<string>, items?: Maybe<Array<Maybe<{ __typename: 'BlockPageBlocksSlideshowItems', title?: Maybe<string>, url?: Maybe<string> }>>> }>>> };

export type PostQueryVariables = Exact<{
  relativePath: Scalars['String'];
}>;


export type PostQuery = { __typename?: 'Query', post: { __typename?: 'Post', id: string, title?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, categories?: Maybe<Array<Maybe<string>>>, published?: Maybe<string>, featured?: Maybe<boolean>, body?: Maybe<any>, _sys: { __typename?: 'SystemInfo', filename: string, basename: string, breadcrumbs: Array<string>, path: string, relativePath: string, extension: string }, author?: Maybe<{ __typename?: 'Author', id: string }> } };

export type PostConnectionQueryVariables = Exact<{ [key: string]: never; }>;


export type PostConnectionQuery = { __typename?: 'Query', postConnection: { __typename?: 'PostConnection', totalCount: number, edges?: Maybe<Array<Maybe<{ __typename?: 'PostConnectionEdges', node?: Maybe<{ __typename?: 'Post', id: string, title?: Maybe<string>, tags?: Maybe<Array<Maybe<string>>>, categories?: Maybe<Array<Maybe<string>>>, published?: Maybe<string>, featured?: Maybe<boolean>, body?: Maybe<any>, _sys: { __typename?: 'SystemInfo', filename: string, basename: string, breadcrumbs: Array<string>, path: string, relativePath: string, extension: string }, author?: Maybe<{ __typename?: 'Author', id: string }> }> }>>> } };

export type AuthorQueryVariables = Exact<{
  relativePath: Scalars['String'];
}>;


export type AuthorQuery = { __typename?: 'Query', author: { __typename?: 'Author', id: string, name?: Maybe<string>, bio?: Maybe<any>, _sys: { __typename?: 'SystemInfo', filename: string, basename: string, breadcrumbs: Array<string>, path: string, relativePath: string, extension: string }, social?: Maybe<Array<Maybe<{ __typename: 'AuthorSocial', platform?: Maybe<string>, handle?: Maybe<string> }>>> } };

export type AuthorConnectionQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthorConnectionQuery = { __typename?: 'Query', authorConnection: { __typename?: 'AuthorConnection', totalCount: number, edges?: Maybe<Array<Maybe<{ __typename?: 'AuthorConnectionEdges', node?: Maybe<{ __typename?: 'Author', id: string, name?: Maybe<string>, bio?: Maybe<any>, _sys: { __typename?: 'SystemInfo', filename: string, basename: string, breadcrumbs: Array<string>, path: string, relativePath: string, extension: string }, social?: Maybe<Array<Maybe<{ __typename: 'AuthorSocial', platform?: Maybe<string>, handle?: Maybe<string> }>>> }> }>>> } };

export type BlockPageQueryVariables = Exact<{
  relativePath: Scalars['String'];
}>;


export type BlockPageQuery = { __typename?: 'Query', blockPage: { __typename?: 'BlockPage', id: string, title?: Maybe<string>, _sys: { __typename?: 'SystemInfo', filename: string, basename: string, breadcrumbs: Array<string>, path: string, relativePath: string, extension: string }, blocks?: Maybe<Array<Maybe<{ __typename: 'BlockPageBlocksHero', title?: Maybe<string>, description?: Maybe<string> } | { __typename: 'BlockPageBlocksBlockQuote', message?: Maybe<any>, author?: Maybe<{ __typename?: 'Author', id: string }> } | { __typename: 'BlockPageBlocksFeaturedPosts', header?: Maybe<string>, blogs?: Maybe<Array<Maybe<{ __typename: 'BlockPageBlocksFeaturedPostsBlogs', item?: Maybe<{ __typename?: 'Post', id: string }> }>>> } | { __typename: 'BlockPageBlocksFeatureList', title?: Maybe<string>, items?: Maybe<Array<Maybe<{ __typename: 'BlockPageBlocksFeatureListItems', title?: Maybe<string>, description?: Maybe<string> }>>> } | { __typename: 'BlockPageBlocksSlideshow', title?: Maybe<string>, items?: Maybe<Array<Maybe<{ __typename: 'BlockPageBlocksSlideshowItems', title?: Maybe<string>, url?: Maybe<string> }>>> }>>> } };

export type BlockPageConnectionQueryVariables = Exact<{ [key: string]: never; }>;


export type BlockPageConnectionQuery = { __typename?: 'Query', blockPageConnection: { __typename?: 'BlockPageConnection', totalCount: number, edges?: Maybe<Array<Maybe<{ __typename?: 'BlockPageConnectionEdges', node?: Maybe<{ __typename?: 'BlockPage', id: string, title?: Maybe<string>, _sys: { __typename?: 'SystemInfo', filename: string, basename: string, breadcrumbs: Array<string>, path: string, relativePath: string, extension: string }, blocks?: Maybe<Array<Maybe<{ __typename: 'BlockPageBlocksHero', title?: Maybe<string>, description?: Maybe<string> } | { __typename: 'BlockPageBlocksBlockQuote', message?: Maybe<any>, author?: Maybe<{ __typename?: 'Author', id: string }> } | { __typename: 'BlockPageBlocksFeaturedPosts', header?: Maybe<string>, blogs?: Maybe<Array<Maybe<{ __typename: 'BlockPageBlocksFeaturedPostsBlogs', item?: Maybe<{ __typename?: 'Post', id: string }> }>>> } | { __typename: 'BlockPageBlocksFeatureList', title?: Maybe<string>, items?: Maybe<Array<Maybe<{ __typename: 'BlockPageBlocksFeatureListItems', title?: Maybe<string>, description?: Maybe<string> }>>> } | { __typename: 'BlockPageBlocksSlideshow', title?: Maybe<string>, items?: Maybe<Array<Maybe<{ __typename: 'BlockPageBlocksSlideshowItems', title?: Maybe<string>, url?: Maybe<string> }>>> }>>> }> }>>> } };

export const PostPartsFragmentDoc = gql`
    fragment PostParts on Post {
  title
  author {
    ... on Document {
      id
    }
  }
  tags
  categories
  published
  featured
  body
}
    `;
export const AuthorPartsFragmentDoc = gql`
    fragment AuthorParts on Author {
  name
  social {
    __typename
    platform
    handle
  }
  bio
}
    `;
export const BlockPagePartsFragmentDoc = gql`
    fragment BlockPageParts on BlockPage {
  title
  blocks {
    __typename
    ... on BlockPageBlocksHero {
      title
      description
    }
    ... on BlockPageBlocksBlockQuote {
      message
      author {
        ... on Document {
          id
        }
      }
    }
    ... on BlockPageBlocksFeaturedPosts {
      header
      blogs {
        __typename
        item {
          ... on Document {
            id
          }
        }
      }
    }
    ... on BlockPageBlocksFeatureList {
      title
      items {
        __typename
        title
        description
      }
    }
    ... on BlockPageBlocksSlideshow {
      title
      items {
        __typename
        title
        url
      }
    }
  }
}
    `;
export const PostDocument = gql`
    query post($relativePath: String!) {
  post(relativePath: $relativePath) {
    _sys {
      filename
      basename
      breadcrumbs
      path
      relativePath
      extension
    }
    id
    ...PostParts
  }
}
    ${PostPartsFragmentDoc}`;
export const PostConnectionDocument = gql`
    query postConnection {
  postConnection {
    totalCount
    edges {
      node {
        id
        _sys {
          filename
          basename
          breadcrumbs
          path
          relativePath
          extension
        }
        ...PostParts
      }
    }
  }
}
    ${PostPartsFragmentDoc}`;
export const AuthorDocument = gql`
    query author($relativePath: String!) {
  author(relativePath: $relativePath) {
    _sys {
      filename
      basename
      breadcrumbs
      path
      relativePath
      extension
    }
    id
    ...AuthorParts
  }
}
    ${AuthorPartsFragmentDoc}`;
export const AuthorConnectionDocument = gql`
    query authorConnection {
  authorConnection {
    totalCount
    edges {
      node {
        id
        _sys {
          filename
          basename
          breadcrumbs
          path
          relativePath
          extension
        }
        ...AuthorParts
      }
    }
  }
}
    ${AuthorPartsFragmentDoc}`;
export const BlockPageDocument = gql`
    query blockPage($relativePath: String!) {
  blockPage(relativePath: $relativePath) {
    _sys {
      filename
      basename
      breadcrumbs
      path
      relativePath
      extension
    }
    id
    ...BlockPageParts
  }
}
    ${BlockPagePartsFragmentDoc}`;
export const BlockPageConnectionDocument = gql`
    query blockPageConnection {
  blockPageConnection {
    totalCount
    edges {
      node {
        id
        _sys {
          filename
          basename
          breadcrumbs
          path
          relativePath
          extension
        }
        ...BlockPageParts
      }
    }
  }
}
    ${BlockPagePartsFragmentDoc}`;
export type Requester<C= {}> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R>
  export function getSdk<C>(requester: Requester<C>) {
    return {
      post(variables: PostQueryVariables, options?: C): Promise<{data: PostQuery, variables: PostQueryVariables, query: string}> {
        return requester<{data: PostQuery, variables: PostQueryVariables, query: string}, PostQueryVariables>(PostDocument, variables, options);
      },
    postConnection(variables?: PostConnectionQueryVariables, options?: C): Promise<{data: PostConnectionQuery, variables: PostConnectionQueryVariables, query: string}> {
        return requester<{data: PostConnectionQuery, variables: PostConnectionQueryVariables, query: string}, PostConnectionQueryVariables>(PostConnectionDocument, variables, options);
      },
    author(variables: AuthorQueryVariables, options?: C): Promise<{data: AuthorQuery, variables: AuthorQueryVariables, query: string}> {
        return requester<{data: AuthorQuery, variables: AuthorQueryVariables, query: string}, AuthorQueryVariables>(AuthorDocument, variables, options);
      },
    authorConnection(variables?: AuthorConnectionQueryVariables, options?: C): Promise<{data: AuthorConnectionQuery, variables: AuthorConnectionQueryVariables, query: string}> {
        return requester<{data: AuthorConnectionQuery, variables: AuthorConnectionQueryVariables, query: string}, AuthorConnectionQueryVariables>(AuthorConnectionDocument, variables, options);
      },
    blockPage(variables: BlockPageQueryVariables, options?: C): Promise<{data: BlockPageQuery, variables: BlockPageQueryVariables, query: string}> {
        return requester<{data: BlockPageQuery, variables: BlockPageQueryVariables, query: string}, BlockPageQueryVariables>(BlockPageDocument, variables, options);
      },
    blockPageConnection(variables?: BlockPageConnectionQueryVariables, options?: C): Promise<{data: BlockPageConnectionQuery, variables: BlockPageConnectionQueryVariables, query: string}> {
        return requester<{data: BlockPageConnectionQuery, variables: BlockPageConnectionQueryVariables, query: string}, BlockPageConnectionQueryVariables>(BlockPageConnectionDocument, variables, options);
      }
    };
  }
  export type Sdk = ReturnType<typeof getSdk>;

// TinaSDK generated code
import { staticRequest } from 'tinacms'
const requester: (doc: any, vars?: any, options?: any) => Promise<any> = async (
  doc,
  vars,
  _options
) => {
  let data = {}
  try {
    data = await staticRequest({
      query: doc,
      variables: vars,
    })
  } catch (e) {
    // swallow errors related to document creation
    console.warn('Warning: There was an error when fetching data')
    console.warn(e)
  }

  return { data, query: doc, variables: vars || {} }
}

/**
 * @experimental this class can be used but may change in the future
 **/
export const ExperimentalGetTinaClient = ()=>getSdk(requester)

