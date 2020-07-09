import React from 'react';
import { Box } from '@material-ui/core';

import clsx from 'clsx';
import { cellStyles } from './cellStyles';

function NaLabel({ center = false }) {
  const classes = cellStyles();

  return (
    <Box
      className={clsx(classes.naLabel, center && classes.naLabelCenter)}
    ></Box>
  );
}

export default NaLabel;
