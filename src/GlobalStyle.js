import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  .card {
    position: absolute;
    will-change: transform, height, opacity;
  }
  
  .details {
    position: relative;
    height: auto;
    box-shadow: 0px 10px 25px -10px rgba(0, 0, 0, 0.2);
  }
  
`;
