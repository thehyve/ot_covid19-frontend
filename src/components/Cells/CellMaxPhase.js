import React from 'react';
import { Box, Link } from '@material-ui/core';
import { darken } from 'polished';

import NaLabel from './NaLabel';
import { cellStyles } from './cellStyles';
import { mapMaxPhase } from '../../data/maps';

function CellMaxPhase({ value, colorScale, onClick }) {
  const classes = cellStyles();
  if (!value) return <NaLabel />;

  const backgroundColor = colorScale[value - 1] || '#fff';
  const border = `2px solid ${darken(0.33, backgroundColor)}`;

  const handleClick = () => {
    onClick(value);
  };

  const BoxWrapper = ({ onClick, children }) =>
    onClick ? (
      <Link href="#" onClick={handleClick}>
        {children}
      </Link>
    ) : (
      children
    );

  return (
    <BoxWrapper onClick={onClick}>
      <Box
        className={classes.maxPhaseContainer}
        style={{ backgroundColor, border }}
      >
        {mapMaxPhase(value)}
      </Box>
    </BoxWrapper>
  );
}

export default CellMaxPhase;
