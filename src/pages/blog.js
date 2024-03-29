import * as React from 'react'
import styled from 'styled-components'
import Layout from '../components/layout'
import Sidebar from '../components/sidebar'
import BlogList from '../components/blog-list'
import { MEDIA } from '../styles'

const Wrapper = styled.div`
  width: 100%;
  padding: 0 15px;
  ${MEDIA.MIN_TABLET`
    display: flex;
    justify-content: space-between;
  `};

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
const Main = styled.div`
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

const Blog = () => {
  return (
    <Layout>
      <Wrapper>
        <Main>
          <BlogList />
        </Main>
        <Side>
          <Sidebar />
        </Side>
      </Wrapper>
    </Layout>
  )
}

export default Blog
