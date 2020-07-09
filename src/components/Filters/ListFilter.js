import React from 'react';
import { Paper, Checkbox, Box } from '@material-ui/core';

import { FilterHeader, IconFalse, IconIndeterminate, IconTrue } from './common';
import { filterStyles } from './filterStyles';

function ListFilter({ name, onChange, onRemove, value, ...headerProps }) {
  const classes = filterStyles();
  const isChecked = value.hasOwnProperty('$ne');

  const handleChangeFilter = (e) => {
    const filter = e.target.checked ? { $ne: null } : { $eq: null };
    onChange({ [name]: filter });
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
          checked={isChecked}
          indeterminate={typeof value === 'undefined'}
          onChange={handleChangeFilter}
        />
      </Box>
    </Paper>
  );
}

export default ListFilter;
