import React, { useState } from 'react';
import clsx from 'clsx';
import {
  Box,
  InputBase,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';

import useDebounce from '../../hooks/useDebounce';
import useUpdateEffect from '../../hooks/useUpdateEffect';
import { navBarStyles } from './navBarStyles';

function TargetSearch({ onChange, contentOpen, value }) {
  const classes = navBarStyles();
  const style = {};
  const theme = useTheme();
  const matchesSmall = useMediaQuery(theme.breakpoints.down('sm'));

  if (matchesSmall) {
    style.marginRight = '3rem';
  } else {
    style.marginRight = contentOpen ? `max(260px, 16%)` : '10rem';
    style.transition = theme.transitions.create('margin-right');
  }

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
    <Box className={classes.searchContainer}>
      <Box className={classes.search} style={style}>
        <Box className={classes.searchIcon}>
          <SearchIcon />
        </Box>
        <InputBase
          classes={{ root: classes.inputRoot, input: classes.inputInput }}
          endAdornment={
            <IconButton
              className={clsx(
                inputValue
                  ? classes.clearIconVisible
                  : classes.clearIconInvisible
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
      </Box>
    </Box>
  );
}

export default TargetSearch;
