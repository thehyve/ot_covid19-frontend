import React from 'react';
import clsx from 'clsx';
import WarningTwoToneIcon from '@material-ui/icons/WarningTwoTone';

import NaLabel from './NaLabel';
import { cellStyles } from './cellStyles';

function CellSafetyHas({ value }) {
  if (!value) return <NaLabel center />;

  const classes = cellStyles();

  return (
    <WarningTwoToneIcon
      className={clsx(classes.iconCell, classes.safetyHasIcon)}
    />
  );
}

export default CellSafetyHas;
