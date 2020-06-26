import React from 'react';
import { Paper } from '@material-ui/core';

import Drawer from './Drawer';
import { drawerStyles } from './drawerStyles';

function ContentDrawer({ children, open }) {
  const classes = drawerStyles();

  return (
    <Drawer title="Content" open={open} position="right">
      <Paper classes={{ root: classes.drawerBody }}>{children}</Paper>
    </Drawer>
  );
}

export default ContentDrawer;
