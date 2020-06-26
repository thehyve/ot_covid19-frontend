import React from 'react';
import { Button, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  titleThin: {
    fontWeight: 300,
    textTransform: 'capitalize',
  },
});

function OpenTargetsTitle({ subtitle }) {
  const classes = useStyles();

  return (
    <Button to="/" color="inherit">
      <Typography variant="h6" color="inherit">
        <span>Open Targets </span>
        <span className={classes.titleThin}>{subtitle}</span>
      </Typography>
    </Button>
  );
}

export default OpenTargetsTitle;
