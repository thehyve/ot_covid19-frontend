import React from 'react';
import CheckCircleTwoTone from '@material-ui/icons/CheckCircleTwoTone';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';

import clsx from 'clsx';
import CellLink from './CellLink';
import NaLabel from './NaLabel';
import { cellStyles } from './cellStyles';

const IconWrapper = ({ link, children }) =>
  link ? <CellLink {...link} label={children} /> : children;

function CellBoolean({
  value,
  link,
  fillNa = false,
  centerNa = false,
  highlightFalse = false,
}) {
  const classes = cellStyles();

  if (value === null && !fillNa) return <NaLabel center={centerNa} />;

  return (
    <IconWrapper link={link}>
      {value ? (
        <CheckCircleTwoTone
          className={clsx(classes.iconCell, classes.booleanIconTrue)}
        />
      ) : (
        <HighlightOffTwoToneIcon
          className={clsx(
            classes.iconCell,
            highlightFalse && classes.booleanIconFalse
          )}
        />
      )}
    </IconWrapper>
  );
}

export default CellBoolean;
