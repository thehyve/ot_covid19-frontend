import React from 'react';
import { Paper, Button, Box } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';

import { drawerStyles } from './drawerStyles';

function Drawer({
  caption,
  children,
  open = false,
  onHide,
  position = 'left',
}) {
  const classes = drawerStyles();

  return (
    <Paper
      classes={{
        root: `${classes.drawerContainer} ${
          open ? classes.drawerOpen : classes.drawerClosed
        }`,
      }}
      elevation={5}
    >
      <Box>
        <Box
          className={classes.drawerTitle}
          justifyContent={position === 'left' ? 'flex-start' : 'flex-end'}
        >
          <Button
            className={classes.drawerTitleButton}
            edge={position === 'right' ? 'end' : 'start'}
            onClick={onHide}
            style={{
              justifyContent: position === 'left' ? 'flex-start' : 'flex-end',
            }}
          >
            {position === 'left' && <ChevronLeft />}
            Hide {caption}
            {position === 'right' && <ChevronRight />}
          </Button>
        </Box>
        {React.Children.count(children) ? children : null}
      </Box>
    </Paper>
  );
}

export default Drawer;
