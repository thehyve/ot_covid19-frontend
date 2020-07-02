import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Typography,
  Paper,
  TextField,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

import useDebounce from '../../../hooks/useDebounce';
import useUpdateEffect from '../../../hooks/useUpdateEffect';
import { drawerStyles } from '../drawerStyles';

function StringFilter({
  name,
  value,
  showRemove,
  onChange,
  onRemove,
  title,
  description,
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
    onChange({ [name]: { $regex: debouncedInputValue } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInputValue]);

  return (
    <Paper classes={{ root: classes.drawerBodyShort }}>
      <Box display="flex" justifyContent="space-between">
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
      <TextField
        label="Biotype"
        onChange={handleChangeFilter}
        value={inputValue}
      />
    </Paper>
  );
}

export default StringFilter;
