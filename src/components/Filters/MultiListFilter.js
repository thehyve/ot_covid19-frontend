import React from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  List,
  ListItem,
  Chip,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import NaLabel from '../Cells/NaLabel';
import { FilterHeader } from './common';
import { filterStyles } from './filterStyles';

function MultiListFilter({
  list,
  name,
  onChange,
  onRemove,
  placeholder = 'Select items...',
  value = { $in: [] },
  ...headerProps
}) {
  const classes = filterStyles();

  const handleChangeFilter = (_, newEntries) => {
    if (!newEntries.length) {
      onRemove(name);
      return;
    }

    onChange({ [name]: { $in: newEntries } });
  };

  const handleDelete = (entry) => {
    handleChangeFilter(
      null,
      value.$in.filter((valueEntry) => valueEntry !== entry)
    );
  };

  const handleRemoveFilter = () => {
    onRemove(name);
  };

  return (
    <Paper className={classes.filterContainer}>
      <FilterHeader onRemove={handleRemoveFilter} {...headerProps} />
      <Box className={classes.filterBodyContainerColumn}>
        <List className={classes.multiListList}>
          {value.$in.map((entry, i) => (
            <ListItem key={i} className={classes.multiListListItem}>
              <Chip
                className={classes.multiListListChip}
                color="primary"
                label={entry}
                onDelete={() => handleDelete(entry)}
                size="small"
              />
            </ListItem>
          ))}
        </List>
        <Autocomplete
          className={classes.multiListAutocomplete}
          disableClearable
          getOptionLabel={(option) => (option ? option : <NaLabel />)}
          multiple
          onChange={handleChangeFilter}
          options={list}
          renderInput={(params) => (
            <TextField {...params} label={placeholder} />
          )}
          renderOption={(option) => (
            <Typography className={classes.multiListAutocompleteOption}>
              {option}
            </Typography>
          )}
          renderTags={() => null}
          size="small"
          value={value?.$in || []}
        />
      </Box>
    </Paper>
  );
}

export default MultiListFilter;
