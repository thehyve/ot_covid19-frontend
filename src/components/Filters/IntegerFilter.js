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

function IntegerFilter({
  name,
  value,
  range = [0, 100],
  showRemove = true,
  onChange,
  onRemove,
  title,
  description,
}) {
  const classes = drawerStyles();
  const [inputValue, setInputValue] = useState(value?.$gte || '');
  const debouncedInputValue = useDebounce(inputValue, 1000);

  const handleChangeFilter = (e) => {
    setInputValue(e.target.value);
  };

  const handleRemoveFilter = () => {
    setInputValue('');
    onRemove(name);
  };

  useUpdateEffect(() => {
    onChange({ [name]: { $regex: debouncedInputValue } });
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
          id="standard-number"
          label="At least..."
          InputLabelProps={{
            shrink: true,
          }}
          style={{ width: '5rem' }}
          type="number"
          onChange={handleChangeFilter}
          value={inputValue}
        />
      </Box>
    </Paper>
  );
}

export default IntegerFilter;
