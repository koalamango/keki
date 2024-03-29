import { createGlobalStyle, css } from 'styled-components'

/* Constance */
export const TIMEOUT = 250

export const BREAKPOINTS = {
  DESKTOP: 992,
  TABLET: 768,
  PHONE: 376,
}

export const COLORS = {
  grayVLight: '#fafafa',
  grayLight: '#e3e3e3',
  grayMedium: '#c7c7c7',
  gray: '#c8c9c7',
  disabled: '#999',
  grayDark: '#666',
  grayDarker: '#333',
  white: '#fff',
  black: '#000',
  danger: '#ef5350',
  warning: '#fdc02f',
  success: '#8bc34a',
  info: '#00b6ed',
  bodyBg: 'white',
  textError: '#ef5350',
  cart: '#ee6881',
  cartHover: '#f4a33f',
}

export const TYPOGRAPHY = {
  fontFamilyBase:
    'Arial, Calibri, nimbussansl, liberationsans, freesans, clean, sans-serif',
  fontFamilyHeadings: 'Roboto Condensed,Calibri,Arial,sans-serif',
  fontSizeExtraSmall: '0.75rem', // 12px
  fontSizeSmall: '0.857rem', // 14px
  fontSizeBase: '16px',
  fontSize: '1rem', // 16px
  fontSizeMedium: '1.125rem', // 18px
  fontSizeLarge: '1.4375rem', // 23px
  fontSizeExtraLarge: '3.125rem', // 50px
  fontWeightHeavy: '700',
  fontWeightMedium: '400', // default
  fontWeightLight: '300',
  fontWeightVLight: '100',
  headingExtraLarge: '2rem', // 32px
  headingLarge: '1.4375rem', // 23px
  headingMedium: '1.1875rem', // 19px
  headingBase: '1rem', // 16px
  headingSmall: '0.875rem', // 14px
  headingExtraSmall: '0.75rem', // 12px
}

export const UTILITIES = {
  borderRadius: '3px',
  borderColor: COLORS.gray,
  lineHeight: '1.5',
  lineHeightLarge: '2',
  rhythmBase: '16px',
  rhythmVerticalBase: '16px',
  rhythmHorizontalBase: '16px',
  contentMaxWidth: '1020px',
  spacingBase: '8px',
  spacingUnit: '8',
}

export const MEDIA = Object.keys(BREAKPOINTS).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${BREAKPOINTS[label] / 16}em) {
      ${css(...args)};
    }
  `

  acc[`MIN_${label}`] = (...args) => css`
    @media (min-width: ${BREAKPOINTS[label] / 16}em) {
      ${css(...args)};
    }
  `

  return acc
}, {})

export default createGlobalStyle`
  html, body, div, span, applet, object, iframe, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  html, body {
    height: 100%;
    margin: 0;
  }
  body {
    background-color: ${COLORS.white};
    color: ${COLORS.grayDarker};
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    -webkit-font-feature-settings: "pnum";
    font-feature-settings: "pnum";
    font-variant-numeric: proportional-nums;
    font-family: ${TYPOGRAPHY.fontFamilyBase};
    font-size: calc(12px + .35vw); 
    line-height: calc(12px + 1.05vw);
    letter-spacing: 1px;
  }
  *, *:after, *:before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  /* 
  Modular scale located at: https://www.modularscale.com/?1,1140,12&em&1.3
  PX to EM: https://all-markup-news.com/px-to-em/
  */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${TYPOGRAPHY.fontFamilyHeadings};
    font-weight: ${TYPOGRAPHY.fontWeightMedium};
    max-width: 100%;
    margin: calc(12px + 1.05vw) 0;
  }
  h4, h5, h6 {
    line-height: calc(18px + .2vw);
  }
  h1 { font-size: 1.912em; line-height: calc(18px + 1.8vw); }
  h2 { font-size: 1.616em; line-height: calc(18px + 1vw); }
  h3 { font-size: 1.471em; line-height: calc(18px + .7vw); }
  h4 { font-size: 1.3em; }
  h5 { font-size: 1.243em; }
  h6 { font-size: 1.132em; }
  ${MEDIA.MIN_DESKTOP`
    h1 { font-size: 1.616em; }
    h2 { font-size: 1.471em; }
    h3 { font-size: 1.3em; }
    h4 { font-size: 1.243em; }
    h5, h6 { font-size: 1.132em; }
  `};
  
  p {
    line-height: ${UTILITIES.lineHeight};
  }
  
  a {
    color: ${COLORS.black};
    text-decoration: none;
    transition: color 0.2s ease;
    &:hover {
      color: ${COLORS.grayMedium};
      border: none;
    }
  }
  
  ol,
  ul {
    list-style: none;
  }

  blockquote {
    background: #f9f9f9;
    border-left: 10px solid #ccc;
    margin: 1.5em 10px;
    padding: 0.5em 10px;
    quotes: '\201C''\201D''\2018''\2019';
  }
  blockquote:before {
    color: #ccc;
    content: open-quote;
    font-size: 4em;
    line-height: 0.1em;
    margin-right: 0.25em;
    vertical-align: -0.4em;
  }
  blockquote p {
    display: inline;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  
  video {
    max-width: 100%;
  }

  img {
    width: 100%;
    height: auto;
  }
  b,
  strong {
    font-weight: bold;
  }
  i {
    font-style: italic;
  }
  .mobile-only {
    display: block;
  }
  .desktop-only {
    display: none;
  }
  ${MEDIA.MIN_DESKTOP`
    .mobile-only {
      display: none;
    }
    .desktop-only {
      display: block;
    }
  `};
  ${MEDIA.MIN_DESKTOP`
    .do-dont {
      display: flex;
      justify-content: space-evenly;
      width: 80%;
      li {
        max-width: 40%;
      }
    }
  `};
  .keyboard-navigation {
    width: 100%;
    max-width: 100%;
    border-collapse: collapse;
    font-size: 16px;
    line-height: 24px;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0px;
    margin-left: 0px;
    margin-right: 0px;
    margin-top: 0px;
    padding-bottom: 0px;
    padding-left: 0px;
    padding-right: 0px;
    padding-top: 0px;
    margin-bottom: 3.25rem;
    font-size: 1rem;
    line-height: 1.625rem;
    border-collapse: collapse;
    width: 100%;
  }
  .keyboard-navigation tr {
    border-bottom: 1px solid rgb(200, 204, 204);
  }
  .keyboard-navigation td,
  .keyboard-navigation th {
    border-width: initial;
    border-style: none;
    border-color: initial;
    border-image: initial;
  }
  th:first-child,
  td:first-child {
    padding-left: 0px;
  }
  td,
  th {
    text-align: left;
    font-feature-settings: 'tnum';
    padding-left: 1.08333rem;
    padding-right: 1.08333rem;
    padding-top: 0.8125rem;
    padding-bottom: calc(0.8125rem - 1px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  }
  th {
    font-weight: 700;
  }
`
