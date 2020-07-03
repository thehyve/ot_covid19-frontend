import React from 'react';
import { Box, Link } from '@material-ui/core';
import { darken } from 'polished';

import { naLabel } from '../../utils';

function CellQuality({ value, colorScale, onClick }) {
  const backgroundColor =
    value === naLabel
      ? colorScale[colorScale.length - 1]
      : colorScale[value - 1] || '#fff';

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
        style={{
          backgroundColor,
          border,
          borderRadius: '25px',
          padding: '0 .25rem',
          margin: 'auto',
          textAlign: 'center',
          width: '3rem',
        }}
      >
        {value}
      </Box>
    </BoxWrapper>
  );
}

export default CellQuality;
