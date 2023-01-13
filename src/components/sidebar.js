import * as React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import styled from 'styled-components'

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
`

export default function Sidebar() {
  const data = useStaticQuery(graphql`
    query SideBarQuery {
      allContentfulBlogs(limit: 10, sort: { createdAt: DESC }) {
        edges {
          node {
            id
            slug
            title
          }
        }
      }
    }
  `)
  return (
    <Wrapper>
      <h3>Recent Posts</h3>
      <ul>
        {data.allContentfulBlogs.edges.map((items) => (
          <li key={items.node.id}>
            <Link to={`/blog/${items.node.slug}`}>{items.node.title}</Link>
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
  )
}
