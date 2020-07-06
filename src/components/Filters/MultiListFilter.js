import React from 'react';
import {
  Box,
  IconButton,
  Typography,
  Paper,
  TextField,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { Autocomplete } from '@material-ui/lab';

import { drawerStyles } from '../Drawer/drawerStyles';
import { naLabel } from '../../utils';

function MultiListFilter({
  name,
  list,
  value,
  showRemove = true,
  onChange,
  onRemove,
  title,
  description,
  placeholder = 'Select items...',
}) {
  const classes = drawerStyles();

  const handleChangeFilter = (_, value) => {
    if (!value.length) {
      onRemove(name);
      return;
    }

    onChange({ [name]: { $in: value } });
  };

  const handleRemoveFilter = () => {
    onRemove(name);
  };

  return (
    <Paper classes={{ root: classes.drawerBodyShort }}>
      <Box display="flex" justifyContent="space-between" padding=".25rem .5rem">
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
        <Autocomplete
          disableCloseOnSelect
          disableClearable
          getOptionLabel={(option) => (option ? option : naLabel)}
          multiple
          onChange={handleChangeFilter}
          options={list}
          renderInput={(params) => (
            <TextField {...params} label={placeholder} />
          )}
          renderOption={(option) => (
            <Typography className={classes.drawerSelectOption}>
              {option}
            </Typography>
          )}
          size="small"
          value={value?.$in || []}
        />
      </Box>
    </Paper>
  );
}

export default MultiListFilter;
