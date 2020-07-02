import React from 'react';
import WarningTwoToneIcon from '@material-ui/icons/WarningTwoTone';
import { colors } from '@material-ui/core';

function CellSafetyHas({ value }) {
  return value ? (
    <WarningTwoToneIcon style={{ color: colors.yellow[800] }} />
  ) : null;
}

export default CellSafetyHas;
