const path = require('path');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');

exports.onCreateWebpackConfig = ({
  stage,
  getConfig,
  rules,
  loaders,
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      plugins: [
        new DirectoryNamedWebpackPlugin({
          exclude: /node_modules/,
        }),
      ],
    },
  });
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
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
    .then(result => {
      if (result.errors) {
        console.log('Error retrieving contentful data', result.errors);
      }
      const productTemplate = path.resolve('./src/templates/product.js');
      const blogTemplate = path.resolve('./src/templates/post.js');

      result.data.allContentfulProduct.edges.forEach(edge => {
        createPage({
          path: `/${edge.node.slug}`,
          component: productTemplate,
          context: {
            slug: edge.node.slug,
            id: edge.node.id,
          },
        });
      });
      result.data.allContentfulBlogs.edges.forEach(data => {
        createPage({
          path: `/${data.node.slug}`,
          component: blogTemplate,
          context: {
            slug: data.node.slug,
            id: data.node.id,
          },
        });
      });
    })
    .catch(error => {
      console.log('Error retrieving contentful data', error);
    });
};
