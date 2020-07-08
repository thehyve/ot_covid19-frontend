import React from 'react';
import { Box, Paper } from '@material-ui/core';

import CellQuality from '../Cells/CellQuality';
import { FilterHeader } from './common';
import { filterStyles } from './filterStyles';
import { qualityMidScale } from '../../data/columns';

function MaxPhaseFilter({ name, onChange, onRemove, value, ...headerProps }) {
  const classes = filterStyles();
  const colorScale = qualityMidScale(4);

  const handleChangeFilter = (value) => {
    onChange({ [name]: { $eq: value } });
  };

  const handleRemoveFilter = () => {
    onRemove(name);
  };

  return (
    <Paper className={classes.filterContainer}>
      <FilterHeader onRemove={handleRemoveFilter} {...headerProps} />
      <Box className={classes.filterBodyContainerRow}>
        {[1, 2, 3, 4].map((maxPhase) => (
          <CellQuality
            colorScale={colorScale}
            key={maxPhase}
            onClick={handleChangeFilter}
            selected={maxPhase === value.$eq}
            value={maxPhase}
          />
        ))}
      </Box>
    </Paper>
  );
}

export default MaxPhaseFilter;
