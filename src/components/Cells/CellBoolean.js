import React from 'react';
import { colors } from '@material-ui/core';
import CheckCircleTwoTone from '@material-ui/icons/CheckCircleTwoTone';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';

import CellLink from './CellLink';
import { naLabel } from '../../utils';

const IconWrapper = ({ link, children }) =>
  link ? <CellLink {...link} label={children} /> : children;

function CellBoolean({ value, link, fillNa = false }) {
  if (value === null && !fillNa) return <>{naLabel}</>;

  return (
    <IconWrapper link={link}>
      {value ? (
        <CheckCircleTwoTone style={{ color: colors.green[500] }} />
      ) : (
        <HighlightOffTwoToneIcon style={{ color: colors.deepOrange.A400 }} />
      )}
    </IconWrapper>
  );
}

export default CellBoolean;
