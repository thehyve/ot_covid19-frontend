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

import { drawerStyles } from '../drawerStyles';
import { naLabel } from '../../../utils';

function MultiListFilter({
  list,
  name,
  value,
  showRemove,
  onChange,
  onRemove,
  title,
  description,
}) {
  const classes = drawerStyles();

  const handleChangeFilter = (_, value) => {
    onChange({ [name]: { $in: value } });
  };

  const handleRemoveFilter = () => {
    onRemove(name);
  };

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
      <Autocomplete
        disableCloseOnSelect
        disableClearable
        getOptionLabel={(option) => (option ? option : naLabel)}
        multiple
        onChange={handleChangeFilter}
        options={list}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Biotype"
            margin="normal"
            style={{ margin: 0 }}
          />
        )}
        size="small"
        value={value?.$in || []}
      />
    </Paper>
  );
}

export default MultiListFilter;
