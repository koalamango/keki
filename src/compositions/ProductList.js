import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link, StaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import MEDIA from './helpers/mediaTemplates';
import { COLORS, TYPOGRAPHY } from './constants';

const Products = styled.div`
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  font-size: ${TYPOGRAPHY.fontSizeMedium};
  text-transform: uppercase;
  letter-spacing: 1.5px;

  a {
    width: 100%;
    transition: all 0.3s ease-in-out;
    &:hover {
      picture {
        opacity: 0.8;
      }
    }
  }
`;
const Product = styled.div`
  width: 100%;
  padding: 0 15px;
  ${MEDIA.MIN_TABLET`
    flex: 50%;
    max-width: 50%;
  `};
  ${MEDIA.MIN_DESKTOP`
    flex: 33%;
    max-width: 33%;
  `};
`;
const Name = styled.div`
  padding: 15px 0 0 0;
  font-weight: ${TYPOGRAPHY.fontWeightHeavy};
`;
const Price = styled.div`
  margin: 10px auto 45px;
  i {
    color: ${COLORS.cart};
    font-size: 30px;
    margin: 0 10px;

    &:hover {
      color: ${COLORS.cartHover};
    }
  }
`;

const ProductList = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allContentfulProduct(sort: { fields: updatedAt, order: DESC }) {
            edges {
              node {
                id
                name
                slug
                rating
                image {
                  fluid(maxWidth: 360) {
                    base64
                    aspectRatio
                    src
                    srcSet
                    srcWebp
                    srcSetWebp
                    sizes
                  }
                }
                price
                details {
                  childMarkdownRemark {
                    excerpt(pruneLength: 140)
                  }
                }
              }
            }
          }
        }
      `}
      render={data => (
        <Products>
          {data.allContentfulProduct.edges.map(items => (
            <Product key={items.node.id}>
              <Link to={`/${items.node.slug}`}>
                <Img
                  fluid={items.node.image ? items.node.image.fluid : {}}
                  alt={items.node.name}
                />
              </Link>
              <Name>
                <Link to={`/${items.node.slug}`}>{items.node.name}</Link>
              </Name>
              <Price>
                <span>&pound;{items.node.price}.00</span>
                <a
                  href="#"
                  className="Product snipcart-add-item"
                  data-item-id={items.node.slug}
                  data-item-price={items.node.price}
                  data-item-image={
                    items.node.image === null ? '' : items.node.image.fluid.src
                  }
                  data-item-name={items.node.name}
                  data-item-url="#"
                >
                  <i
                    className="fa fa-cart-plus"
                    aria-hidden="true"
                    aria-label="Add to Cart"
                  />
                </a>
              </Price>
            </Product>
          ))}
        </Products>
      )}
    />
  );
};

ProductList.propTypes = {
  data: PropTypes.object,
};

export default ProductList;
