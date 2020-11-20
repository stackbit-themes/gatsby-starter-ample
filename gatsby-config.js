const postcssConfig = require("./postcss.config")
const path = require("path")

module.exports = {
  siteMetadata: {
    title: `Ample's Gatsby Starter`,
    description: `The base for a new Ample development project.`,
    author: `@helloample`,
    siteUrl: `https://www.site-url.com`
  },
  plugins: [
    {
      resolve: `gatsby-alias-imports`,
      options: {
        aliases: {
          "@plugins": `./plugins`,
          "@root": `./`,
          "@src": `./src`
        }
      }
    },
    /**
     * Uses schema.yml at the root of the project to explicitly declare GraphQL
     * schema. (See plugins/gatsby-ample-schema.)
     */
    `gatsby-ample-schema`,
    /**
     * Looks in src/content and passes every page (except index.md) to
     * src/templates/page/adapter.js. (See plugins/gatsby-ample-pages.)
     */
    `gatsby-ample-pages`,
    // Creates meta tags for every page
    // src/templates/page/adapter.js. (See plugins/gatsby-ample-seo.)
    `gatsby-ample-seo`,
    /**
     * Creates Gatsby and Netlify redirects for records in
     * src/content/redirects. (See plugins/gatsby-ample-redirects.)
     */
    {
      resolve: `gatsby-ample-redirects`,
      options: {
        // Setting GATSBY_REDIRECTS_DISABLED="true" disables redirects. This
        // applies to both in-app redirects and those written to _redirects for
        // use by Netlify.
        disable: process.env.GATSBY_REDIRECTS_DISABLED === "true"
      }
    },
    /**
     * Creates playgrounds from components and templates. (See
     * plugins/gatsby-ample-playground.)
     */
    {
      resolve: `gatsby-ample-playground`,
      options: {
        // Setting GATSBY_PLAYGROUND_DISABLED="true" disables the playground
        // build.
        disable: process.env.GATSBY_PLAYGROUND_DISABLED === "true"
      }
    },
    // Adds a debugger for media queries
    // src/layout. (See plugins/gatsby-ample-debuggers.)
    `gatsby-ample-debuggers`,
    // Adds linters for local development
    // (See plugins/gatsby-ample-linters.)
    `gatsby-ample-linters`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `uploads`,
        path: `${__dirname}/static/uploads`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          // gatsby-remark-relative-images must
          // go before gatsby-remark-images
          {
            resolve: `gatsby-remark-relative-images`
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 1440
            }
          }
        ]
      }
    },
    {
      resolve: `gatsby-remark-ample`,
      // Commented lines are the plugin's default options. Read more here:
      // https://github.com/ample/gatsby-remark-ample
      options: {
        // contentSrc: "src/content/",
        // imageExtensions: [".jpg", ".jpeg", ".png"],
        imageSrc: path.join(__dirname, "static"),
        // imageSuffix: "_src",
        // markdownSuffix: "_md",
        // modelField: "model",
        models: ["AdminReferences", "AdminSeo", "Form", "Page", "Redirect"],
        plugins: ["gatsby-ample-pages"],
        projectRoot: path.join(__dirname)
        // seoField: "seo",
      }
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        // TODO: Update project fonts.
        //
        // google: {
        //   families: ["Font Family"]
        // },
        // typekit: {
        //   id: ["typekit-id"]
        // }
      }
    },
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-ample`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#0095df`,
        theme_color: `#0095df`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`
      }
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        cssLoaderOptions: {
          localIdentName: "[local]-[hash:base64:3]",
          sourceMap: true
        },
        fiber: require("fibers"),
        implementation: require("sass"),
        postCssPlugins: postcssConfig,
        sourceMap: true
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GATSBY_GOOGLE_ANALYTICS_ID
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`
      }
    },
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {
          "/*": ["X-Frame-Options: SAMEORIGIN"]
        }
      }
    }
  ]
}
