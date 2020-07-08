import React from 'react';
import { Paper } from '@material-ui/core';

import Drawer from './Drawer';
import { drawerStyles } from './drawerStyles';
import DrawerHelp from './DrawerHelp';

function ContentDrawer({ children, onToggleDrawer, open }) {
  const classes = drawerStyles();

  return (
    <Drawer
      title="Content"
      open={open}
      onHide={onToggleDrawer}
      position="right"
    >
      {!React.Children.count(children) ? (
        <DrawerHelp
          title="No cell selected"
          content={<>Click on a cell in the table to get details about it.</>}
        />
      ) : (
        <Paper classes={{ root: classes.drawerBody }}>{children}</Paper>
      )}
    </Drawer>
  );
}

export default ContentDrawer;
