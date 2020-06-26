import React from 'react';
import { Box, Paper, Typography } from '@material-ui/core';

import { drawerStyles } from './drawerStyles';

function Drawer({
  title,
  subtitle,
  children,
  position = 'right',
  open = false,
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
      <Paper classes={{ root: classes.drawerTitle }} elevation={0}>
        <Box display="flex" flexDirection="column">
          <Typography className={classes.drawerTitleCaption} align={position}>
            {title}
          </Typography>
          {subtitle && (
            <Typography
              className={classes.drawerSubtitleCaption}
              align={position}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      </Paper>
      {React.Children.count(children) ? children : null}
    </Paper>
  );
}

export default Drawer;
