import React from 'react';
import {
  Box,
  Checkbox,
  colors,
  FormControlLabel,
  IconButton,
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
  showRemove = true,
  onChange,
  onRemove,
  title,
  description,
}) {
  const classes = drawerStyles();

  const handleChangeFilter = (e) => {
    onChange({ [name]: { $eq: e.target.checked } });
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
              checked={value.$eq}
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
        <Box className={classes.drawerBodyDescription}>{description}</Box>
      )}
    </Paper>
  );
}

export default BooleanFilter;
