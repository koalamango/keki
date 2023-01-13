const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(
    `
      {
        allContentfulProduct {
          edges {
            node {
              id
              slug
            }
          }
        }
        allContentfulBlogs {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    `
  )
    .then((result) => {
      if (result.errors) {
        console.log('Error retrieving contentful data', result.errors)
      }
      const productTemplate = path.resolve('src/templates/product-detail.js')
      const blogTemplate = path.resolve('src/templates/blog-post.js')

      result.data.allContentfulProduct.edges.forEach((edge) => {
        createPage({
          path: `/product/${edge.node.slug}`,
          component: productTemplate,
          context: {
            slug: edge.node.slug,
            id: edge.node.id,
          },
        })
      })
      result.data.allContentfulBlogs.edges.forEach((data) => {
        createPage({
          path: `/blog/${data.node.slug}`,
          component: blogTemplate,
          context: {
            slug: data.node.slug,
            id: data.node.id,
          },
        })
      })
    })
    .catch((error) => {
      console.log('Error retrieving contentful data', error)
    })
}
