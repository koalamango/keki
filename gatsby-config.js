// support for .env, .env.development, and .env.production
require('dotenv').config()
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    siteUrl: 'https://keki.vercel.app/',
    title: 'Kēki | Artisan Cakes',
    description: 'A collection of artisan cakes',
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
  plugins: [
    {
      resolve: 'gatsby-source-contentful',
      options: {
        downloadLocal: true,
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        host: process.env.CONTENTFUL_HOST,
      },
    },
    {
      resolve: 'gatsby-plugin-snipcartv3',
      options: {
        apiKey: process.env.snipcart,
        autopop: true,
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-plugin-image',
    'gatsby-transformer-sharp',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Kēki | Artisan Cakes',
        short_name: 'Kēki',
        start_url: '/',
        // These can be imported once ESM support lands
        background_color: '#fff',
        theme_color: '#000',
        icon: 'static/favicon.png',
      },
    },
  ],
}
