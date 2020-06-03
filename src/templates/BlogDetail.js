import React from 'react';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';
import { DiscussionEmbed } from 'disqus-react';
import styled from 'styled-components';
import Layout from '../compositions/Layout';

const disqusShortname = 'Keki';

const Wrapper = styled.div`
  padding: 0 15px;
  .gatsby-image-wrapper {
    max-height: 500px;
  }
`;
const Author = styled.div`
  margin: 40px 0;
  display: flex;
  img {
    border-radius: 50%;
    margin-right: 20px;
  }
  div + div 
  
`;

const BlogDetail = data => (
  <Layout>
    <Wrapper>
      <Img
        fluid={data.data.contentfulBlogs.featureImage.fluid}
        alt={data.data.contentfulBlogs.title}
      />
      <h2>{data.data.contentfulBlogs.title}</h2>
      <div
        dangerouslySetInnerHTML={{
          __html:
            data.data.contentfulBlogs.description.childMarkdownRemark.html,
        }}
      />
      <Author>
        <img
          src={data.data.contentfulBlogs.author.photo.fixed.src}
          alt={data.data.contentfulBlogs.author.name}
        />
        <div>
          <div>{data.data.contentfulBlogs.author.name}</div>
          <div>{data.data.contentfulBlogs.publicData}</div>
        </div>
      </Author>
      <DiscussionEmbed
        shortname={disqusShortname}
        config={{
          identifier: data.data.contentfulBlogs.id,
          title: data.data.contentfulBlogs.title,
        }}
      />
    </Wrapper>
  </Layout>
);

export default BlogDetail;

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
          fixed(width: 80, height: 80) {
            src
          }
        }
      }
      description {
        childMarkdownRemark {
          html
          excerpt(pruneLength: 250)
        }
      }
      featureImage {
        fluid(maxHeight: 500) {
          base64
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
        }
      }
    }
  }
`;
