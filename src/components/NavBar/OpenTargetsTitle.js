import React from 'react';
import { Box, Button } from '@material-ui/core';
import Title from '../../assets/title';
import { navBarStyles } from './navBarStyles';

function OpenTargetsTitle({ onClick }) {
  const classes = navBarStyles();

  return (
    <Box className={classes.titleContainer}>
      <Button className={classes.titleButton} color="inherit" onClick={onClick}>
        <Title height="19px" />
      </Button>
    </Box>
  );
}

export default OpenTargetsTitle;
