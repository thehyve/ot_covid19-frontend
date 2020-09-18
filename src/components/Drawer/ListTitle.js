import React from 'react';
import { Box, Typography } from '@material-ui/core';

import { drawerStyles } from './drawerStyles';

function ListTitle({ title, description, subtitle }) {
  const classes = drawerStyles();

  return (
    <Box className={classes.drawerBodyTitle}>
      <Typography className={classes.drawerTitleCaption}>{title}</Typography>
      {subtitle && (
        <Typography className={classes.drawerSubtitleCaption}>
          {subtitle}
        </Typography>
      )}
      <Typography variant="caption">{description}</Typography>
    </Box>
  );
}

export default ListTitle;
