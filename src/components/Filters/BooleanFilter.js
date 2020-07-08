import React from 'react';
import { Paper } from '@material-ui/core';

import { FilterHeaderBoolean } from './common';
import { filterStyles } from './filterStyles';

function BooleanFilter({ name, onChange, onRemove, value, ...titleProps }) {
  const classes = filterStyles();

  const handleChangeFilter = (e) => {
    onChange({ [name]: { $eq: e.target.checked } });
  };

  const handleRemoveFilter = () => {
    onRemove(name);
  };

  return (
    <Paper className={classes.filterContainer}>
      <FilterHeaderBoolean
        onChange={handleChangeFilter}
        onRemove={handleRemoveFilter}
        value={value.$eq}
        {...titleProps}
      />
    </Paper>
  );
}

export default BooleanFilter;
