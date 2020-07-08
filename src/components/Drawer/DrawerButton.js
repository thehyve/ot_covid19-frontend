import React from 'react';
import { Button } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';

import { drawerStyles } from './drawerStyles';

function DrawerButton({ onClick, position = 'right', caption, open }) {
  const classes = drawerStyles();

  return (
    <Button
      className={classes.drawerTitleButton}
      color="inherit"
      onClick={onClick}
      edge={position === 'right' ? 'end' : 'start'}
      style={{
        justifyContent: position === 'left' ? 'flex-start' : 'flex-end',
      }}
    >
      {position === 'left' && <ChevronRight />}
      Show {caption}
      {position === 'right' && <ChevronLeft />}
    </Button>
  );
}

export default DrawerButton;
