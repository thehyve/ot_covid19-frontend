import React from 'react';
import { Paper } from '@material-ui/core';

import { FilterHeaderBoolean } from './common';
import { filterStyles } from './filterStyles';

function ListFilter({ name, onChange, onRemove, value, ...titleProps }) {
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
      <FilterHeaderBoolean
        onChange={handleChangeFilter}
        onRemove={handleRemoveFilter}
        value={isChecked}
        {...titleProps}
      />
    </Paper>
  );
}

export default ListFilter;
