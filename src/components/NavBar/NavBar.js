import React from 'react';
import { AppBar, Toolbar, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.primary.main,
    margin: 0,
    width: '100%',
    zIndex: theme.zIndex.drawer - 1,
  },
  toolBar: {
    justifyContent: 'space-between',
    padding: 0,
  },
}));

function NavBar({ children }) {
  const classes = useStyles();

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
