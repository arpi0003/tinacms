import { defineSchema, defineConfig } from "tinacms";
import { client } from "./client";
import { contentBlockSchema } from "../components/blocks/content";
import { featureBlockShema } from "../components/blocks/features";
import { heroBlockSchema } from "../components/blocks/hero";
import { testimonialBlockSchema } from "../components/blocks/testimonial";
import { iconSchema } from "../components/icon";

const schema = defineSchema({
  config: {
    media: {
      tina: {
        publicFolder: "public",
        mediaRoot: "uploads",
      },
    },
  },
  collections: [
    {
      label: "Blog Posts",
      name: "posts",
      path: "content/posts",
      format: "mdx",
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
          required: true,
          isTitle: true,
        },
        {
          type: "image",
          name: "heroImg",
          label: "Hero Image",
        },
        {
          type: "rich-text",
          label: "Excerpt",
          name: "excerpt",
        },
        {
          type: "reference",
          label: "Author",
          name: "author",
          collections: ["authors"],
        },
        {
          type: "datetime",
          label: "Posted Date",
          name: "date",
          ui: {
            dateFormat: "MMMM DD YYYY",
            timeFormat: "hh:mm A",
          },
        },
        {
          type: "rich-text",
          label: "Body",
          name: "_body",
          templates: [
            {
              name: "DateTime",
              label: "Date & Time",
              inline: true,
              fields: [
                {
                  name: "format",
                  label: "Format",
                  type: "string",
                  options: ["utc", "iso", "local"],
                },
              ],
            },
            {
              name: "BlockQuote",
              label: "Block Quote",
              fields: [
                {
                  name: "children",
                  label: "Quote",
                  type: "rich-text",
                },
                {
                  name: "authorName",
                  label: "Author",
                  type: "string",
                },
              ],
            },
            {
              name: "NewsletterSignup",
              label: "Newsletter Sign Up",
              fields: [
                {
                  name: "children",
                  label: "CTA",
                  type: "rich-text",
                },
                {
                  name: "placeholder",
                  label: "Placeholder",
                  type: "string",
                },
                {
                  name: "buttonText",
                  label: "Button Text",
                  type: "string",
                },
                {
                  name: "disclaimer",
                  label: "Disclaimer",
                  type: "rich-text",
                },
              ],
              ui: {
                defaultItem: {
                  placeholder: "Enter your email",
                  buttonText: "Notify Me",
                },
              },
            },
          ],
          isBody: true,
        },
      ],
    },
    {
      label: "Global",
      name: "global",
      path: "content/global",
      format: "json",
      fields: [
        {
          type: "object",
          label: "Header",
          name: "header",
          fields: [
            iconSchema,
            {
              type: "string",
              label: "Color",
              name: "color",
              options: [
                { label: "Default", value: "default" },
                { label: "Primary", value: "primary" },
              ],
            },
            {
              type: "object",
              label: "Nav Links",
              name: "nav",
              list: true,
              ui: {
                defaultItem: {
                  href: "home",
                  label: "Home",
                },
              },
              fields: [
                {
                  type: "string",
                  label: "Link",
                  name: "href",
                },
                {
                  type: "string",
                  label: "Label",
                  name: "label",
                },
              ],
            },
          ],
        },
        {
          type: "object",
          label: "Footer",
          name: "footer",
          fields: [
            {
              type: "string",
              label: "Color",
              name: "color",
              options: [
                { label: "Default", value: "default" },
                { label: "Primary", value: "primary" },
              ],
            },
            {
              type: "object",
              label: "Social Links",
              name: "social",
              fields: [
                {
                  type: "string",
                  label: "Facebook",
                  name: "facebook",
                },
                {
                  type: "string",
                  label: "Twitter",
                  name: "twitter",
                },
                {
                  type: "string",
                  label: "Instagram",
                  name: "instagram",
                },
                {
                  type: "string",
                  label: "Github",
                  name: "github",
                },
              ],
            },
          ],
        },
        {
          type: "object",
          label: "Theme",
          name: "theme",
          fields: [
            {
              type: "string",
              label: "Primary Color",
              name: "color",
              options: [
                {
                  label: "Blue",
                  value: "blue",
                },
                {
                  label: "Teal",
                  value: "teal",
                },
                {
                  label: "Green",
                  value: "green",
                },
                {
                  label: "Red",
                  value: "red",
                },
                {
                  label: "Pink",
                  value: "pink",
                },
                {
                  label: "Purple",
                  value: "purple",
                },
                {
                  label: "Orange",
                  value: "orange",
                },
                {
                  label: "Yellow",
                  value: "yellow",
                },
              ],
            },
            {
              type: "string",
              name: "font",
              label: "Font Family",
              options: [
                {
                  label: "System Sans",
                  value: "sans",
                },
                {
                  label: "Nunito",
                  value: "nunito",
                },
                {
                  label: "Lato",
                  value: "lato",
                },
              ],
            },
            {
              type: "string",
              name: "icon",
              label: "Icon Set",
              options: [
                {
                  label: "Boxicons",
                  value: "boxicon",
                },
                {
                  label: "Heroicons",
                  value: "heroicon",
                },
              ],
            },
            {
              type: "string",
              name: "darkMode",
              label: "Dark Mode",
              options: [
                {
                  label: "System",
                  value: "system",
                },
                {
                  label: "Light",
                  value: "light",
                },
                {
                  label: "Dark",
                  value: "dark",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      label: "Authors",
      name: "authors",
      path: "content/authors",
      format: "md",
      fields: [
        {
          type: "string",
          label: "Name",
          name: "name",
          required: true,
          isTitle: true,
        },
        {
          type: "string",
          label: "Avatar",
          name: "avatar",
        },
      ],
    },
    {
      label: "Pages",
      name: "pages",
      path: "content/pages",
      fields: [
        {
          type: "object",
          list: true,
          name: "blocks",
          label: "Sections",
          ui: {
            visualSelector: true,
          },
          templates: [
            heroBlockSchema,
            featureBlockShema,
            contentBlockSchema,
            testimonialBlockSchema,
          ],
        },
      ],
    },
  ],
});

export default schema;

export const tinaConfig = defineConfig({
  client,
  schema,
  // Can add this back in if we want to use the cloudinary media store
  // mediaStore: async () => {
  //   const pack = await import("next-tinacms-cloudinary");
  //   return pack.TinaCloudCloudinaryMediaStore;
  // },
  cmsCallback: (cms) => {
    /**
     * Enables experimental branch switcher
     */
    cms.flags.set("branch-switcher", true);
    cms.flags.set("experimentalData", true);

    // cms.sidebar.position = "overlay";
    // cms.sidebar.defaultState = "closed";
    // cms.sidebar.renderNav = false;

    /**
     * When `tina-admin` is enabled, this plugin configures contextual editing for collections
     */
    import("tinacms").then(({ RouteMappingPlugin }) => {
      const RouteMapping = new RouteMappingPlugin((collection, document) => {
        if (["authors", "global"].includes(collection.name)) {
          return undefined;
        }
        if (["pages"].includes(collection.name)) {
          if (document._sys.filename === "home") {
            return `/`;
          }
          if (document._sys.filename === "about") {
            return `/about`;
          }
          return undefined;
        }
        return `/${collection.name}/${document._sys.filename}`;
      });
      cms.plugins.add(RouteMapping);
    });

    return cms;
  },
  formifyCallback: ({ formConfig, createForm, createGlobalForm }) => {
    if (formConfig.id === "content/global/index.json") {
      return createGlobalForm(formConfig);
    }

    return createForm(formConfig);
  },
});
