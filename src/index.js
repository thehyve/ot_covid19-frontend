import React from 'react';
import ReactDOM from 'react-dom';
import {
  MuiThemeProvider,
  CssBaseline,
  createMuiTheme,
} from '@material-ui/core';
import 'typeface-inter';

import App from './App';
import theme from './theme';

ReactDOM.render(
  <MuiThemeProvider theme={createMuiTheme(theme)}>
    <CssBaseline />
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
);
