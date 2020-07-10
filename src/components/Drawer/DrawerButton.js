import React from 'react';
import { Button, useMediaQuery, useTheme } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';

import { drawerStyles } from './drawerStyles';
import { sideBarWidthPercent } from '../../config';

function DrawerButton({ onClick, position = 'right', caption, open }) {
  const classes = drawerStyles();
  const theme = useTheme();
  const matchesSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const width = matchesSmall ? '0' : !open ? `${sideBarWidthPercent}%` : '9rem';

  return (
    <Button
      className={classes.drawerTitleButton}
      color="inherit"
      onClick={onClick}
      edge={position === 'right' ? 'end' : 'start'}
      style={{
        justifyContent: position === 'left' ? 'flex-start' : 'flex-end',
        width,
      }}
    >
      {position === 'left' && <ChevronRight />}
      {matchesSmall ? null : `Show ${caption}`}
      {position === 'right' && <ChevronLeft />}
    </Button>
  );
}

export default DrawerButton;
