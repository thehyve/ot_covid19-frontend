import React from 'react';
import {
  Box,
  Checkbox,
  colors,
  FormControlLabel,
  IconButton,
  Typography,
  Paper,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import CheckCircleTwoTone from '@material-ui/icons/CheckCircleTwoTone';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

import { drawerStyles } from '../Drawer/drawerStyles';

function BooleanFilter({
  name,
  value,
  integer = false,
  nullAsFalse = false,
  showRemove,
  onChange,
  onRemove,
  title,
  description,
}) {
  const classes = drawerStyles();

  const getFilter = (value) => {
    if (!integer) {
      return { $eq: value };
    } else {
      const comparator = value ? '$gt' : '$eq';
      return { [comparator]: 0 };
    }
  };

  const isChecked = (value) => {
    if (!integer) {
      return value.$eq;
    } else {
      return Object.keys(value)[0] === '$gt';
    }
  };

  const handleChangeFilter = (e) => {
    const filter = getFilter(e.target.checked);

    onChange({ [name]: filter });
  };

  const handleRemoveFilter = () => {
    onRemove(name);
  };

  return (
    <Paper classes={{ root: classes.drawerBodyShort }}>
      <Box display="flex" justifyContent="space-between">
        <FormControlLabel
          control={
            <Checkbox
              icon={
                <HighlightOffTwoToneIcon
                  style={{ color: colors.deepOrange.A400 }}
                />
              }
              checkedIcon={
                <CheckCircleTwoTone style={{ color: colors.green[500] }} />
              }
              indeterminateIcon={
                <RadioButtonUncheckedIcon style={{ color: colors.grey[500] }} />
              }
              checked={isChecked(value)}
              indeterminate={typeof value === 'undefined'}
              onChange={handleChangeFilter}
            />
          }
          label={title}
          style={{ marginLeft: 0 }}
        />
        {showRemove && (
          <IconButton onClick={handleRemoveFilter}>
            <ClearIcon />
          </IconButton>
        )}
      </Box>
      {description && (
        <Box>
          <Typography className={classes.drawerBodyDescription}>
            {description}
          </Typography>
        </Box>
      )}
    </Paper>
  );
}

export default BooleanFilter;
