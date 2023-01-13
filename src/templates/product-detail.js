import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import Layout from '../components/layout'
import { MEDIA, COLORS } from '../styles'

library.add(faCartPlus)

const Image = styled.div`
  .gatsby-image-wrapper {
    width: 100%;
    height: 100%;
  }
`
const Summary = styled.div``
const Wrapper = styled.div`
  padding: 0 15px;
  
  ${MEDIA.MIN_TABLET`
    display: flex;
    justify-content: space-between;
    ${Image}, ${Summary} {
      flex: 48%;
      max-width: 48%;
    }
  `};
`
const Banner = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;

  .snipcart-add-item svg {
    margin: 0 10px 0 0;
    color: ${COLORS.cart};

    &:hover {
      color: ${COLORS.cartHover};
    }
  }
`

export default function ProductDetail(props) {
  const product = props.data.contentfulProduct

  return (
    <Layout>
      <Wrapper>
        <Image>
          {product.image && (
            <GatsbyImage
              image={getImage(product.image)}
              alt={product.name}
              src={product.image.url}
            />
          )}
        </Image>
        <Summary>
          <h2>{product.name}</h2>
          <h3>&pound;{product.price}</h3>
          <Banner>
            <a
              href="#cart"
              className="snipcart-add-item"
              data-item-id={product.slug}
              data-item-price={product.price}
              data-item-image={product.image.url}
              data-item-name={product.name}
            >
              <FontAwesomeIcon icon="fa-solid fa-cart-plus" />
              Buy Now
            </a>
          </Banner>
          <div
            dangerouslySetInnerHTML={{
              __html: product.details.details,
            }}
          />
        </Summary>
      </Wrapper>
    </Layout>
  )
}

export const query = graphql`
  query ProductQuery($slug: String!) {
    contentfulProduct(slug: { eq: $slug }) {
      id
      name
      slug
      price
      image {
        url
        gatsbyImageData(formats: WEBP, placeholder: BLURRED)
      }
      details {
        details
      }
      rating
    }
  }
`
