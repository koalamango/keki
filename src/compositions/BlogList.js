import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link, StaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { COLORS, TYPOGRAPHY } from './constants';

const Posts = styled.div`
  h2 {
    text-transform: uppercase;
    letter-spacing: 1.5px;
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
`;
const Post = styled.div`
  width: 100%;
  padding: 0 15px;
  .gatsby-image-wrapper {
    max-height: 300px;
  }
`;
const CTA = styled.p`
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
`;

const BlogList = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allContentfulBlogs {
            edges {
              node {
                id
                title
                slug
                description {
                  childMarkdownRemark {
                    excerpt(pruneLength: 250)
                  }
                }
                featureImage {
                  fluid(maxHeight: 300) {
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
          }
        }
      `}
      render={data => (
        <Posts>
          {data.allContentfulBlogs.edges.map(items => (
            <Post key={items.node.id}>
              <Img
                fluid={
                  items.node.featureImage ? items.node.featureImage.fluid : {}
                }
                alt={items.node.name}
              />
              <h2>
                <Link to={`/${items.node.slug}`}>{items.node.title}</Link>
              </h2>
              <p>{items.node.description.childMarkdownRemark.excerpt}</p>
              <CTA>
                <Link to={`/${items.node.slug}`}>Read more</Link>
              </CTA>
            </Post>
          ))}
        </Posts>
      )}
    />
  );
};

BlogList.propTypes = {
  data: PropTypes.object,
};

export default BlogList;
