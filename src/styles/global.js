import { createGlobalStyle } from 'styled-components';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

export default createGlobalStyle`

    @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

* {
      margin:0;
      padding:0;
      outline:0;
      box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    background: #353940;
    color: #fff;
    font-family: 'Source Sans Pro', sans-serif;

  }

  input, button {
    font-family: 'Source Sans Pro', sans-serif;
  }

  button {
    cursor: pointer;
  }
`;
