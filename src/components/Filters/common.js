import React from 'react';

import {
  Box,
  Checkbox,
  colors,
  IconButton,
  FormControlLabel,
  Typography,
} from '@material-ui/core';

import AdjustIcon from '@material-ui/icons/Adjust';
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

function RemoveFilter({ onRemove }) {
  return (
    <Tooltip title="Remove filter">
      <IconButton onClick={onRemove}>
        <ClearIcon />
      </IconButton>
    </Tooltip>
  );
}

export function FilterHeaderBoolean({
  description,
  onChange,
  onRemove,
  showRemove = true,
  title,
  value,
}) {
  const classes = filterStyles();

  return (
    <>
      <Box className={classes.filterTitleContainer}>
        <FormControlLabel
          control={
            <Checkbox
              icon={IconFalse}
              checkedIcon={IconTrue}
              indeterminateIcon={IconIndeterminate}
              checked={value}
              indeterminate={typeof value === 'undefined'}
              onChange={onChange}
            />
          }
          label={title}
          style={{ marginLeft: 0 }}
        />
        {showRemove && <RemoveFilter onRemove={onRemove} />}
      </Box>
      {description && (
        <Box className={classes.filterDescription}>{description}</Box>
      )}
    </>
  );
}

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
        <Box display="flex">
          <AdjustIcon style={{ margin: '.25rem' }} />
          <Typography className={classes.filterTitle} variant="body1">
            {title}
          </Typography>
        </Box>
        {showRemove && <RemoveFilter onRemove={onRemove} />}
      </Box>
      {description && (
        <Typography className={classes.filterDescription}>
          {description}
        </Typography>
      )}
    </>
  );
}
