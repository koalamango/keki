import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { DiscussionEmbed } from 'disqus-react'
import styled from 'styled-components'
import Layout from '../components/layout'

const disqusShortname = 'Keki'

const Wrapper = styled.div`
  padding: 0 15px;
`
const FeatureImageWrapper = styled.div`
  .gatsby-image-wrapper,
  img {
    object-fit: cover;
    object-position: center center;
    max-height: 500px;
    height: 100%;
    width: 100%;
  }
`
const Author = styled.div`
  margin: 40px 0;
  display: flex;
  img {
    border-radius: 50%;
    margin-right: 20px;
    width: 80px;
    height: 80px;
  }
`

export default function BlogDetail(props) {
  const post = props.data.contentfulBlogs
  const featured = getImage(post.featureImage)
  const avatar = getImage(post.author.photo)

  return (
    <Layout>
      <Wrapper>
        <FeatureImageWrapper>
          {post.featureImage && (
            <GatsbyImage image={featured} alt={post.featureImage.title} />
          )}
        </FeatureImageWrapper>
        <h2>{post.title}</h2>
        {post.description.description && (
          <div
            dangerouslySetInnerHTML={{
              __html: post.description.description,
            }}
          />
        )}
        <Author>
          <GatsbyImage image={avatar} alt={post.author.name} />
          <div>
            <div>{post.author.name}</div>
            <div>{post.publicData}</div>
          </div>
        </Author>
        <DiscussionEmbed
          shortname={disqusShortname}
          config={{
            identifier: post.id,
            title: post.title,
          }}
        />
      </Wrapper>
    </Layout>
  )
}

export const query = graphql`
  query BlogQuery($slug: String!) {
    contentfulBlogs(slug: { eq: $slug }) {
      id
      title
      slug
      publicData(formatString: "MMMM D, YYYY")
      author {
        name
        photo {
          resize(width: 80, height: 80) {
            width
            height
            src
          }
          gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP])
        }
        createdAt(formatString: "MMMM D, YYYY")
      }
      description {
        description
      }
      featureImage {
        title
        url
        gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP])
      }
    }
  }
`
