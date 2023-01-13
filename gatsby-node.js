const path = require('path')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Query for markdown nodes to use in creating pages.
  const result = await graphql(
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

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Create pages for each blog and product.
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
}
