import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    --color-background: #181716;
    --color-midground: #2f3233;
    --color-button: #485053;
    --color-highlight: #d0db97;
    --color-underline: #3d6979;
    --color-underline2: #69b578;
    --color-text: #fefefe;
    --font-heading: 'Cardo', Arial, Helvetica, serif;
    --font-body: 'Libre Franklin', Arial, Helvetica, sans-serif;
    --padding-page: 10vw 5vw;
  }

  /* http://meyerweb.com/eric/tools/css/reset/
      v2.0 | 20110126
      License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
      margin: 0;
      padding: 0;
      border: 0;
      box-sizing: border-box;
      font-size: 100%;
      vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
      display: block;
  }
  body {
      line-height: 1;
  }
  ol, ul {
      list-style: none;
  }
  blockquote, q {
      quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
      content: '';
      content: none;
  }

  h1,
  h2,
  h3,
  label,
  button {
        color: #fff;
        font-family: var(--font-heading);
        font-size: 32px;
        text-align: center;
  }

  p,
  a,
  li,
  blockquote,
  input {
        font-family: var(--font-body);
        font-size: 14px;
  }

  input {
    font-size: 24px;
    height: 42px;
    border: 2px solid var(--color-orange);
    border-radius: 4px;
    padding: 0 12px;
  }
`;
