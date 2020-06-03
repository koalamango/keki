var dotenv = require('dotenv');
dotenv.config();

const path = require('path');
const { spaceId, accessToken, snipcart } = process.env;

module.exports = {
  pathPrefix: '/keki',
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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `components`,
        path: `${__dirname}/src/templates`,
      },
    },
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
        spaceId,
        accessToken,
      },
    },
    {
      resolve: 'gatsby-plugin-snipcartv3',
      options: {
        apiKey: snipcart,
        autopop: true,
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
    pathPrefix: null,
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
