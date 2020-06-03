import React from 'react';
import PropTypes from 'prop-types';
import Layout from '@components/Layout';
import styled from 'styled-components';
import MEDIA from '@components/helpers/mediaTemplates';
import SideBar from '@components/SideBar';
import { graphql } from 'gatsby';

const Wrapper = styled.div`
  padding: 0 15px;
  width: 100%;
  ${MEDIA.MIN_TABLET`
    display: flex;
    justify-content: space-between;
  `};
`;
const Main = styled.div`
  img {
    width: 100%;
  }
  ${MEDIA.MIN_TABLET`
    flex: 85%;
    max-width: 85%;
  `};
`;
const Side = styled.div`
  ${MEDIA.MIN_TABLET`
    margin-left: 30px;
  `};
`;

const About = data => {
  const author = data.data.allContentfulAuthor.edges[0].node;
  return (
    <Layout>
      <Wrapper>
        <Main>
          <img src={author.photo.fluid.src} alt={author.name} />
          <div
            dangerouslySetInnerHTML={{
              __html: author.about.childMarkdownRemark.html,
            }}
          />
        </Main>
        <Side>
          <SideBar />
        </Side>
      </Wrapper>
    </Layout>
  );
};

About.propTypes = {
  data: PropTypes.object,
};

export default About;

export const query = graphql`
  query AboutQuery {
    allContentfulAuthor(filter: { name: { eq: "About" } }) {
      edges {
        node {
          photo {
            fluid {
              src
            }
          }
          about {
            childMarkdownRemark {
              rawMarkdownBody
              html
            }
          }
          name
        }
      }
    }
  }
`;
