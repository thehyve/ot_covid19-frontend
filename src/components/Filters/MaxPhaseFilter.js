import React from 'react';
import { Box, Paper } from '@material-ui/core';

import { FilterHeader } from './common';
import { filterStyles } from './filterStyles';
import { mapMaxPhase } from '../../data/maps';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

function MaxPhaseFilter({ name, onChange, onRemove, value, ...headerProps }) {
  const classes = filterStyles();

  const handleChangeFilter = (_, value) => {
    if (!value) {
      return;
    }

    onChange({ [name]: { $eq: value } });
  };

  const handleRemoveFilter = () => {
    onRemove(name);
  };

  return (
    <Paper className={classes.filterContainer}>
      <FilterHeader onRemove={handleRemoveFilter} {...headerProps} />
      <Box className={classes.filterBodyContainerRow}>
        <ToggleButtonGroup
          exclusive
          onChange={handleChangeFilter}
          value={value.$eq}
        >
          {[1, 2, 3, 4].map((maxPhase, i) => (
            <ToggleButton
              className={classes.maxPhaseButton}
              key={maxPhase}
              selected={value.$eq === maxPhase}
              value={maxPhase}
            >
              {mapMaxPhase(maxPhase)}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
    </Paper>
  );
}

export default MaxPhaseFilter;
