import React from 'react';
import {
  Box,
  CircularProgress,
  makeStyles,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles({
  loadingBox: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '75vh',
    justifyContent: 'center',
  },
});

function LoadingBox({ width }) {
  const classes = useStyles();

  return (
    <Box className={classes.loadingBox} style={{ width }}>
      <CircularProgress />
      <Typography>Loading...</Typography>
    </Box>
  );
}

export default LoadingBox;
