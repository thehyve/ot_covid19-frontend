import React from 'react';
import { Checkbox, Paper, Box } from '@material-ui/core';

import { IconFalse, IconIndeterminate, IconTrue, FilterHeader } from './common';

import { filterStyles } from './filterStyles';

function BooleanFilter({ name, onChange, onRemove, value, ...headerProps }) {
  const classes = filterStyles();

  const handleChangeFilter = (e) => {
    onChange({ [name]: { $eq: e.target.checked } });
  };

  const handleRemoveFilter = () => {
    onRemove(name);
  };

  return (
    <Paper className={classes.filterContainer}>
      <FilterHeader onRemove={handleRemoveFilter} {...headerProps} />
      <Box className={classes.filterBodyContainerRow}>
        <Checkbox
          icon={IconFalse}
          checkedIcon={IconTrue}
          indeterminateIcon={IconIndeterminate}
          checked={value.$eq}
          indeterminate={typeof value === 'undefined'}
          onChange={handleChangeFilter}
        />
      </Box>
    </Paper>
  );
}

export default BooleanFilter;
