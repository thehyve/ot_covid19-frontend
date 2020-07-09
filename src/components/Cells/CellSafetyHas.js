import React from 'react';

import NaLabel from './NaLabel';
import { cellStyles } from './cellStyles';
import { IconWarning } from '../common';

function CellSafetyHas({ value }) {
  if (!value) return <NaLabel center />;

  const classes = cellStyles();

  return <IconWarning className={classes.iconCell} />;
}

export default CellSafetyHas;
