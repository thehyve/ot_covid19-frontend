import React from 'react';
import { Box, Paper } from '@material-ui/core';
import { darken } from 'polished';

import { FilterHeader } from './common';
import { filterStyles } from './filterStyles';
import { qualityMidScale } from '../../data/columns';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

function MaxPhaseFilter({ name, onChange, onRemove, value, ...headerProps }) {
  const classes = filterStyles();
  const colorScale = qualityMidScale(4);

  const handleChangeFilter = (_, value) => {
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
          {[1, 2, 3, 4].map((maxPhase, i) => {
            const selected = maxPhase === value.$eq;
            const backgroundColor = selected
              ? darken(0.3, colorScale[i])
              : colorScale[i];
            return (
              <ToggleButton
                className={classes.maxPhaseButton}
                key={maxPhase}
                selected={selected}
                style={{ backgroundColor }}
                value={maxPhase}
              >
                {maxPhase}
              </ToggleButton>
            );
          })}
        </ToggleButtonGroup>
      </Box>
    </Paper>
  );
}

export default MaxPhaseFilter;
