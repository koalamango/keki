const dotenv = require('dotenv');
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});
const path = require('path');
const { snipcart } = process.env;

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken:
    process.env.CONTENTFUL_ACCESS_TOKEN ||
    process.env.CONTENTFUL_DELIVERY_TOKEN,
};

if (process.env.CONTENTFUL_HOST) {
  contentfulConfig.host = process.env.CONTENTFUL_HOST;
  contentfulConfig.accessToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;
}

const { spaceId, accessToken } = contentfulConfig;

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the access token need to be provided.'
  );
}

module.exports = {
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-offline`,
    `gatsby-transformer-json`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-eslint`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/compositions/images`,
      },
    },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `components`,
    //     path: `${__dirname}/src/compositions`,
    //   },
    // },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-webpack-size`,
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /images\/.*\.svg$/,
        },
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        options: contentfulConfig,
      },
    },
    {
      resolve: 'gatsby-plugin-snipcartv3',
      options: {
        apiKey: snipcart,
        autopop: true,
      },
    },
    {
      resolve: 'gatsby-plugin-module-resolver',
      options: {
        root: './src', // <- will be used as a root dir
        aliases: {
          '@components': './compositions', // <- will become ./src/components
          helpers: './compositions/helpers', // <- will become ./src/helpers
          static: {
            root: './public', // <- will used as this alias' root dir
            alias: './static', // <- will become ./public/static
          },
        },
      },
    },
  ],
  siteMetadata: {
    siteTitle: `Kēki | Artisan Cakes`,
    siteTitleShort: `Kēki`,
    siteDescription: `A collection of artisan cakes`,
    siteUrl: `https://www.google.co.uk`,
    themeColor: `#000`,
    backgroundColor: `#fff`,
    logo: path.resolve(__dirname, 'src/compositions/images/logo.svg'),
    social: {
      twitter: ``,
      fbAppId: ``,
    },
    headerLinks: [
      {
        name: `Home`,
        link: `/`,
      },
      {
        name: `About`,
        link: `/about`,
      },
      {
        name: `Shop`,
        link: `/shop`,
      },
      {
        name: `Blog`,
        link: `/blog`,
      },
      {
        name: `Cart`,
        link: `#`,
      },
    ],
    footerLinks: [
      {
        name: `facebook`,
        link: `https://www.facebook.com/`,
      },
      {
        name: `twitter`,
        link: `https://twitter.com/`,
      },
      {
        name: `instagram`,
        link: `http://www.instagram.com/`,
      },
      {
        name: `pinterest`,
        link: `http://www.pinterest.com/`,
      },
      {
        name: `youtube`,
        link: `http://www.youtube.com/`,
      },
    ],
  },
};
