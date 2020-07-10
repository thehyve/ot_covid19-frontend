import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';

import { navBarStyles } from './navBarStyles';

function NavBar({ children }) {
  const classes = navBarStyles();

  return (
    <AppBar
      className={classes.appBar}
      color="primary"
      elevation={0}
      position="fixed"
    >
      <Toolbar className={classes.toolBar} variant="dense">
        {children}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
