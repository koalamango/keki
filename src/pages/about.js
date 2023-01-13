import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import styled from 'styled-components'
import Layout from '../components/layout'
import Sidebar from '../components/sidebar'
import { MEDIA } from '../styles'

const Wrapper = styled.div`
  padding: 0 15px;
  width: 100%;
  ${MEDIA.MIN_TABLET`
    display: flex;
    justify-content: space-between;
  `};
  .gatsby-image-wrapper {
    margin-bottom: 30px;
  }
`
const Main = styled.div`
  img {
    width: 100%;
  }
  ${MEDIA.MIN_TABLET`
    flex: 85%;
    max-width: 85%;
  `};
`
const Side = styled.div`
  ${MEDIA.MIN_TABLET`
    margin-left: 30px;
  `};
`

export default function About(props) {
  const author = props.data.allContentfulAuthor.edges[0].node
  const image = getImage(author.photo)

  return (
    <Layout>
      <Wrapper>
        <Main>
          {author.photo && <GatsbyImage image={image} alt={author.name} />}
          {author.about.about}
        </Main>
        <Side>
          <Sidebar />
        </Side>
      </Wrapper>
    </Layout>
  )
}

export const query = graphql`
  query AboutQuery {
    allContentfulAuthor(filter: { name: { eq: "About" } }) {
      edges {
        node {
          photo {
            gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP])
            url
            height
            width
          }
          about {
            about
          }
          name
        }
      }
    }
  }
`
