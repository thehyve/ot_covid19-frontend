import React from 'react';
import { Button } from '@material-ui/core';
import Title from '../../assets/title';
import { navBarStyles } from './navBarStyles';

function OpenTargetsTitle({ onClick }) {
  const classes = navBarStyles();

  const handleClick = () => {
    console.log('click');
    onClick();
  };

  return (
    <Button
      className={classes.titleButton}
      color="inherit"
      onClick={handleClick}
    >
      <Title height="19px" />
    </Button>
  );
}

export default OpenTargetsTitle;
