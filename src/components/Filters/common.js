import React from 'react';

import { Box, colors, IconButton, Typography } from '@material-ui/core';

import CheckCircleTwoTone from '@material-ui/icons/CheckCircleTwoTone';
import ClearIcon from '@material-ui/icons/Clear';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

import Tooltip from '../Table/Tooltip';
import { filterStyles } from './filterStyles';

export const IconFalse = (
  <HighlightOffTwoToneIcon style={{ color: colors.deepOrange.A400 }} />
);

export const IconTrue = (
  <CheckCircleTwoTone style={{ color: colors.green[500] }} />
);

export const IconIndeterminate = (
  <RadioButtonUncheckedIcon style={{ color: colors.grey[500] }} />
);

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
