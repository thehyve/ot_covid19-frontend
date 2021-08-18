import React, { useState } from 'react';
import { Paper, TextField } from '@material-ui/core';

import useDebounce from '../../hooks/useDebounce';
import useUpdateEffect from '../../hooks/useUpdateEffect';
import { FilterHeader } from './common';
import { filterStyles } from './filterStyles';

function StringFilter({
  caseSensitive = true,
  name,
  onChange,
  onRemove,
  placeholder = 'Enter text...',
  value,
  ...headerProps
}) {
  const classes = filterStyles();
  const [inputValue, setInputValue] = useState(value?.$regex || '');
  const debouncedInputValue = useDebounce(inputValue, 1000);

  const handleChangeFilter = (e) => {
    setInputValue(e.target.value);
  };

  const handleRemoveFilter = () => {
    setInputValue('');
    onRemove(name);
  };

  useUpdateEffect(() => {
    const finalValue = caseSensitive
      ? debouncedInputValue
      : RegExp(debouncedInputValue, 'i');

    onChange({ [name]: { $regex: finalValue } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInputValue]);

  return (
    <Paper className={classes.filterContainer}>
      <FilterHeader onRemove={handleRemoveFilter} {...headerProps} />
      <TextField
        className={classes.filterBodyContainerRow}
        label={placeholder}
        onChange={handleChangeFilter}
        value={inputValue}
      />
    </Paper>
  );
}

export default StringFilter;
