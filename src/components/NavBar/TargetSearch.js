import React, { useState } from 'react';
import clsx from 'clsx';
import { InputBase, IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';

import useDebounce from '../../hooks/useDebounce';
import useUpdateEffect from '../../hooks/useUpdateEffect';
import { navBarStyles } from './navBarStyles';

function TargetSearch({ onChange, value }) {
  const classes = navBarStyles();
  const [inputValue, setInputValue] = useState(value || '');
  const debouncedInputValue = useDebounce(inputValue, 300);

  useUpdateEffect(() => {
    onChange(debouncedInputValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInputValue]);

  const handleChangeSearch = (e) => {
    setInputValue(e.target.value);
  };

  const handleClearSearch = () => {
    setInputValue('');
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        classes={{ root: classes.inputRoot, input: classes.inputInput }}
        endAdornment={
          <IconButton
            className={clsx(
              inputValue ? classes.clearIconVisible : classes.clearIconInvisible
            )}
            onClick={handleClearSearch}
          >
            <ClearIcon className={classes.clearIcon} />
          </IconButton>
        }
        onChange={handleChangeSearch}
        placeholder="Search..."
        value={inputValue}
      />
    </div>
  );
}

export default TargetSearch;
