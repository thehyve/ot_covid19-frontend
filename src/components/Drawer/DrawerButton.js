import React from 'react';
import { IconButton } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';

function DrawerButton({ onClick, position = 'right', open }) {
  const ToggleDrawerIcon =
    (position === 'right' && open) || (position === 'left' && !open)
      ? ChevronLeft
      : ChevronRight;

  return (
    <IconButton
      color="inherit"
      onClick={onClick}
      edge={position === 'right' ? 'end' : 'start'}
    >
      <ToggleDrawerIcon />
    </IconButton>
  );
}

export default DrawerButton;
