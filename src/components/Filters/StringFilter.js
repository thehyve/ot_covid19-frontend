import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Typography,
  Paper,
  TextField,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

import useDebounce from '../../hooks/useDebounce';
import useUpdateEffect from '../../hooks/useUpdateEffect';
import { drawerStyles } from '../Drawer/drawerStyles';

function StringFilter({
  name,
  value,
  capitalize = false,
  showRemove = true,
  onChange,
  onRemove,
  title,
  description,
  placeholder = 'Enter text...',
}) {
  const classes = drawerStyles();
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
    const finalValue = capitalize
      ? debouncedInputValue.toUpperCase()
      : debouncedInputValue;

    onChange({ [name]: { $regex: finalValue } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInputValue]);

  return (
    <Paper classes={{ root: classes.drawerBodyShort }}>
      <Box
        display="flex"
        justifyContent="space-between"
        padding=".25rem 0 .25rem .5rem"
      >
        <Typography variant="body1">{title}</Typography>
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
      <Box padding="0 .5rem .5rem .5rem">
        <TextField
          label={placeholder}
          onChange={handleChangeFilter}
          value={inputValue}
        />
      </Box>
    </Paper>
  );
}

export default StringFilter;
