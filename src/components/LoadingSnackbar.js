import React from 'react';
import {
  Snackbar,
  Box,
  Slide,
  makeStyles,
  LinearProgress,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const usesStyles = makeStyles((theme) => ({
  snackbarRoot: {
    bottom: '.5rem',
    left: '.5rem',
    minWidth: '14.625rem',
    width: '12.5%',
  },
  snackbarTitle: {
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  snackbarCaption: {
    fontSize: '.66rem',
  },
}));

function LoadingSnackbar({ open, onClose }) {
  const classes = usesStyles();

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={open}
      className={classes.snackbarRoot}
      onClose={onClose}
      TransitionComponent={Slide}
    >
      <Box display="flex" flexDirection="column" flex="1">
        <Alert severity="info" elevation={6} onClose={onClose} variant="filled">
          Working...
        </Alert>
        <LinearProgress color="secondary" style={{ height: '5px' }} />
      </Box>
    </Snackbar>
  );
}

export default LoadingSnackbar;
