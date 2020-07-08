import React, { useState } from 'react';
import { Paper, TextField } from '@material-ui/core';

import useDebounce from '../../hooks/useDebounce';
import useUpdateEffect from '../../hooks/useUpdateEffect';
import { FilterHeader } from './common';
import { filterStyles } from './filterStyles';

function IntegerFilter({
  name,
  onChange,
  onRemove,
  range = { min: 1, max: 100 },
  value,
  ...headerProps
}) {
  const classes = filterStyles();
  const [inputValue, setInputValue] = useState(value?.$gte || '');
  const debouncedInputValue = useDebounce(inputValue, 1000);

  const handleChangeFilter = (e) => {
    setInputValue(parseInt(e.target.value));
  };

  const handleRemoveFilter = () => {
    setInputValue('');
    onRemove(name);
  };

  useUpdateEffect(() => {
    onChange({ [name]: { $gte: debouncedInputValue } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInputValue]);

  return (
    <Paper className={classes.filterContainer}>
      <FilterHeader onRemove={handleRemoveFilter} {...headerProps} />
      <TextField
        className={classes.filterBodyContainerRow}
        InputProps={{ inputProps: range }}
        label="At least..."
        onChange={handleChangeFilter}
        type="number"
        value={inputValue}
      />
    </Paper>
  );
}

export default IntegerFilter;
