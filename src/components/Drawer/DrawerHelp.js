import React from 'react';
import { Paper, Typography } from '@material-ui/core';

import ListTitle from './ListTitle';
import { drawerStyles } from './drawerStyles';

function DrawerHelp({ title, content }) {
  const classes = drawerStyles();

  return (
    <Paper classes={{ root: classes.drawerBodyShort }}>
      <ListTitle title={title} />
      <Typography className={classes.drawerBodyTextHelp}>{content}</Typography>
    </Paper>
  );
}

export default DrawerHelp;
