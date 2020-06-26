import React from 'react';
import { Box, Typography } from '@material-ui/core';

import { drawerStyles } from './drawerStyles';

function ListTitle({ title, description, length }) {
  const classes = drawerStyles();

  return (
    <Box className={classes.drawerBodyTitle}>
      <Typography className={classes.drawerTitleCaption}>{title}</Typography>
      <Typography className={classes.drawerSubtitleCaption}>
        {length} entries
      </Typography>
      <Typography variant="caption">{description}</Typography>
    </Box>
  );
}

export default ListTitle;
