import React from 'react';
import PropTypes from 'prop-types';
import posed from 'react-pose';
import { StaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';
import Box from 'compositions/Box';
import { COLORS, TYPOGRAPHY, UTILITIES } from 'compositions/constants';
import GlobalStyle from 'compositions/css';
import Head from 'compositions/Head';
import LogoImg from 'compositions/images/logo.png';
import MEDIA from 'compositions/helpers/mediaTemplates';

const AnimatedContainer = posed.div({
  enter: {
    y: 0,
    transition: {
      ease: 'easeInOut',
    },
  },
  exit: {
    y: '-100%',
    transition: {
      ease: 'easeInOut',
    },
  },
});

const Header = styled.header`
  white-space: nowrap;
  font-family: ${TYPOGRAPHY.fontFamilyHeadings};
  text-transform: uppercase;
  background-color: ${COLORS.white};
  letter-spacing: 2px;
  height: 80px;
  display: block;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 7;
  ${MEDIA.TABLET`
    position: fixed;
    width: 100%;
  `};
  ${MEDIA.MIN_TABLET`
    > div {
      display: flex;
      justify-content: space-between;
      height: 80px;
    }
  `};
`;

const Logo = styled.div`
  width: 100%;
  padding: 8px 16px;
  img {
    height: auto;
    width: auto;
    max-height: 40px;
  }
  ${MEDIA.MIN_TABLET`
    padding: 16px 32px;
    img {
      max-height: 48px;
    }
  `};
`;

const TopNav = styled.nav`
  position: relative;
  z-index: 8;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  a {
    cursor: pointer;
    height: 100%;
  }
  ${MEDIA.TABLET`
    input:checked ~ ul {
      height: auto;
      border-top: 1px solid ${COLORS.grayLight};
      border-bottom: 1px solid ${COLORS.grayLight};
    }
    ul {
      background-color: ${COLORS.white}; 
      height: 0;
      overflow: hidden;
      margin-top: -1px;
    }
    li {
      height: 32px;
    }
    a {
      line-height: 32px;
      padding-left: 16px;
      display: block;
      border-left: 4px solid transparent;
      &:hover {
        border-left: 4px solid ${COLORS.grayDark};
      }
      &.active {
        border-left: 4px solid ${COLORS.grayDarker};
        &:hover {
          border-left: 4px solid ${COLORS.grayDark};
        }
      }
    }
  `};
  ${MEDIA.MIN_TABLET`
    padding-right: 32px;
    ul {
      display: flex;
      align-item: stretch;
    }
    li {
      & + li {
        margin-left: 32px;
      }
    }
    a {
      line-height: 80px;
    }
  `};
`;

const NavCheck = styled.input`
  position: absolute;
  right: 16px;
  top: -45px;
  width: 30px;
  height: 30px;
  display: block;
  z-index: 9;
  margin: 0;
  padding: 0;
  opacity: 0;
  cursor: pointer;
`;

const NavBtn = styled.div`
  position: absolute;
  right: 16px;
  top: -45px;
  span {
    display: block;
    width: 25px;
    height: 10px;
    border-top: 2px solid ${COLORS.primary};
  }
`;

const Main = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 95px 0 0 0;
  min-height: calc(100vh - 50px);
  ${MEDIA.TABLET`
    padding-top: 60px;
  `};
`;

const Footer = styled.div`
  width: 100%;
  display: block;
  text-align: center;
  padding: ${UTILITIES.spacingUnit * 4}px;
  font-size: ${TYPOGRAPHY.fontSizeSmall};
  a {
    font-family: ${TYPOGRAPHY.fontFamilyHeadings};
    text-decoration: none;
    padding: 0 ${UTILITIES.rhythmBase};
  }
  span:last-of-type span {
    display: none;
  }
`;
const Socials = styled.div`
  font-size: ${TYPOGRAPHY.fontSizeLarge};
`;

const Layout = ({ data, children }) => (
  <div>
    <GlobalStyle />
    <Head />
    <AnimatedContainer>
      <Header>
        <Box>
          <Logo>
            <Link to="/">
              <img src={LogoImg} alt={data.site.siteMetadata.siteTitle} />
            </Link>
          </Logo>
          <TopNav>
            <NavCheck type="checkbox" />
            <NavBtn>
              <span />
              <span />
              <span />
            </NavBtn>
            <ul>
              {data.site.siteMetadata.headerLinks.map(link => (
                <li key={link.name}>
                  {link.name === 'Cart' ? (
                    <a href="#" className="snipcart-summary snipcart-checkout">
                      Cart
                    </a>
                  ) : (
                    <Link
                      to={link.link}
                      activeClassName="active"
                      partiallyActive={true}
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </TopNav>
        </Box>
      </Header>
    </AnimatedContainer>
    <Box>
      <Main>{children}</Main>
    </Box>
    <Footer>
      <Socials>
        {data.site.siteMetadata.footerLinks.map(link => (
          <span key={link.name}>
            <a href={link.link} target="_blank" rel="noopener noreferrer">
              <i
                className={`fa fa-${link.name}`}
                aria-hidden="true"
                aria-label={link.name}
              />
            </a>
          </span>
        ))}
      </Socials>
      <p>&copy; {new Date().getFullYear()} All Rights Reserved.</p>
    </Footer>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.object.isRequired,
};

const LayoutWithQuery = props => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        site {
          siteMetadata {
            siteTitle
            headerLinks {
              name
              link
            }
            footerLinks {
              name
              link
            }
          }
        }
      }
    `}
    render={data => <Layout data={data} {...props} />}
  />
);

LayoutWithQuery.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutWithQuery;
