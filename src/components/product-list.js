import * as React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import styled from 'styled-components'
import { MEDIA, COLORS, TYPOGRAPHY } from '../styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'

library.add(faCartPlus)

const ProductsWrapper = styled.div`
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
`
const ProductWrapper = styled.div`
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
`
const Name = styled.div`
  padding: 15px 0 0 0;
  font-weight: ${TYPOGRAPHY.fontWeightHeavy};
`
const Price = styled.div`
  margin: 10px auto 45px;

  .snipcart-add-item svg {
    color: ${COLORS.cart};
    font-size: 23px;
    margin: 0 10px;

    &:hover {
      color: ${COLORS.cartHover};
    }
  }
`

export default function ProductList() {
  const data = useStaticQuery(graphql`
    query ProductListQuery {
      allContentfulProduct(sort: { createdAt: DESC }) {
        edges {
          node {
            id
            slug
            name
            rating
            image {
              gatsbyImageData(placeholder: BLURRED, formats: WEBP)
              url
            }
            details {
              details
            }
            price
          }
        }
      }
    }
  `)

  return (
    <>
      <ProductsWrapper>
        {data.allContentfulProduct.edges.map((items) => (
          <ProductWrapper key={items.node.id}>
            <Link to={`/product/${items.node.slug}`}>
              {items.node.image && (
                <GatsbyImage
                  image={getImage(items.node.image)}
                  alt={items.node.name}
                  src={items.node.image.url}
                />
              )}
            </Link>
            <Name>
              <Link to={`/product/${items.node.slug}`}>{items.node.name}</Link>
            </Name>
            <Price>
              <span>&pound;{items.node.price}.00</span>
              <a
                href="#cart"
                className="Product snipcart-add-item"
                data-item-id={items.node.slug}
                data-item-price={items.node.price}
                data-item-image={
                  items.node.image === null ? '' : items.node.image.url
                }
                data-item-name={items.node.name}
                data-item-url="#"
              >
                <FontAwesomeIcon icon="fa-solid fa-cart-plus" />
              </a>
            </Price>
          </ProductWrapper>
        ))}
      </ProductsWrapper>
    </>
  )
}
