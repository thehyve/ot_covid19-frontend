import React from 'react';
import { Box } from '@material-ui/core';

import { cellStyles } from './cellStyles';

function NaLabel() {
  const classes = cellStyles();

  return <Box className={classes.naLabel}></Box>;
}

export default NaLabel;
