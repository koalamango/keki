import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Layout from '../compositions/Layout';
import MEDIA from '../compositions/helpers/mediaTemplates';
import { COLORS, TYPOGRAPHY } from '../compositions/constants';

const Image = styled.div``;
const Summary = styled.div``;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  ${MEDIA.MIN_TABLET`
    ${Image}, ${Summary} {
      flex: 48%;
      max-width: 48%;
    }
  `};
`;
const Banner = styled.div`
  display: flex;
  justify-content: space-between;

  a {
  }
  a i {
    font-size: ${TYPOGRAPHY.fontSizeLarge};
    margin: 0 10px;
    color: ${COLORS.cart};

    &:hover {
      color: ${COLORS.cartHover};
    }
  }
`;

const Product = data => (
  <Layout>
    <Wrapper>
      <Image>
        <Img
          fluid={
            data.data.contentfulProduct.image
              ? data.data.contentfulProduct.image.fluid
              : {}
          }
          alt={data.data.contentfulProduct.name}
        />
      </Image>
      <Summary>
        <h2>{data.data.contentfulProduct.name}</h2>
        <h3>&pound;{data.data.contentfulProduct.price}</h3>
        <Banner>
          <StarRatingComponent
            name="rate"
            starCount={5}
            value={data.data.contentfulProduct.rating}
          />
          <a
            href="#"
            className="Product snipcart-add-item"
            data-item-id={data.data.contentfulProduct.slug}
            data-item-price={data.data.contentfulProduct.price}
            data-item-image={
              data.data.contentfulProduct.image === null
                ? ''
                : data.data.contentfulProduct.image.fixed.src
            }
            data-item-name={data.data.contentfulProduct.name}
            data-item-url="/"
          >
            <i className="fa fa-cart-plus" />
            Buy Now
          </a>
        </Banner>

        <div
          dangerouslySetInnerHTML={{
            __html:
              data.data.contentfulProduct.details.childMarkdownRemark.html,
          }}
        />
      </Summary>
    </Wrapper>
  </Layout>
);

export default Product;

export const query = graphql`
  query ProductQuery($slug: String!) {
    contentfulProduct(slug: { eq: $slug }) {
      id
      name
      slug
      image {
        fluid(maxWidth: 500) {
          base64
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
        }
        fixed(width: 1120, height: 500) {
          width
          height
          src
          srcSet
        }
      }
      price
      details {
        childMarkdownRemark {
          html
        }
      }
      productMorePhotos {
        id
        fixed(width: 1120, height: 600) {
          src
        }
      }
      rating
    }
  }
`;
