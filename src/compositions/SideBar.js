import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link, StaticQuery } from 'gatsby';
import styled from 'styled-components';

const Wrapper = styled.div`
  ul {
    padding-left: 25px;
  }
  li {
    list-style: circle;
  }
  h3 {
    margin: 0;
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
  input {
    height: 30px;
    margin: 20px 0;
  }
`;
const SideBar = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allContentfulBlogs(
            limit: 10
            sort: { order: DESC, fields: createdAt }
          ) {
            edges {
              node {
                id
                slug
                title
              }
            }
          }
        }
      `}
      render={data => (
        <Wrapper>
          <h3>Recent Posts</h3>
          <ul>
            {data.allContentfulBlogs.edges.map(items => (
              <li key={items.node.id}>
                <Link to={`/${items.node.slug}`}>{items.node.title}</Link>
              </li>
            ))}
          </ul>
          <div>
            <label htmlFor="email">
              <h3>Keep in touch</h3>
            </label>
            <input type="email" id="email" size="30" />
            <input id="submit" name="commit" type="submit" value="GO" />
          </div>
        </Wrapper>
      )}
    />
  );
};

SideBar.propTypes = {
  data: PropTypes.object,
};

export default SideBar;
