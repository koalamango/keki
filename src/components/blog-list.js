import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import styled from 'styled-components'
import { COLORS, TYPOGRAPHY } from '../styles'

const Posts = styled.div`
  h2 {
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-bottom: 10px;
  }
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
const Post = styled.div`
  margin-bottom: 50px;
  img {
    object-fit: cover;
    object-position: center center;
    max-height: 300px;
    width: 100%;
  }
`
const Cta = styled.p`
  a {
    cursor: pointer;
    color: ${COLORS.white};
    background-color: ${COLORS.black};
    border: 1px solid ${COLORS.black};
    font-size: ${TYPOGRAPHY.fontSizeExtraSmall};
    text-transform: uppercase;
    padding: 10px 30px;

    &:hover {
      background-color: ${COLORS.white};
      color: ${COLORS.black};
    }
  }
`

export default function BlogList() {
  const data = useStaticQuery(graphql`
    query BlogListQuery {
      allContentfulBlogs {
        edges {
          node {
            slug
            title
            id
            description {
              description
            }
            featureImage {
              url
              width
              height
              title
            }
          }
        }
      }
    }
  `)

  return (
    <>
      <Posts>
        {data.allContentfulBlogs.edges.map((items) => (
          <Post key={items.node.id}>
            {items.node.featureImage && (
              <img
                src={items.node.featureImage.url}
                alt={items.node.featureImage.title}
              />
            )}
            <h2>
              <a href={`/blog/${items.node.slug}`}>{items.node.title}</a>
            </h2>
            <p>{items.node.description.description.substring(0, 250)}...</p>
            <Cta>
              <a href={`/blog/${items.node.slug}`}>Read more</a>
            </Cta>
          </Post>
        ))}
      </Posts>
    </>
  )
}
