import React from 'react';

import { Box, IconButton, Typography } from '@material-ui/core';

import ClearIcon from '@material-ui/icons/Clear';

import Tooltip from '../Table/Tooltip';
import { filterStyles } from './filterStyles';

export function FilterHeader({
  description,
  onRemove,
  showRemove = true,
  title,
}) {
  const classes = filterStyles();

  return (
    <>
      <Box className={classes.filterTitleContainer}>
        <Typography className={classes.filterTitle} variant="body1">
          {title}
        </Typography>
        {showRemove && (
          <Tooltip title="Remove filter">
            <IconButton onClick={onRemove}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      {description && (
        <Typography className={classes.filterDescription}>
          {description}
        </Typography>
      )}
    </>
  );
}
