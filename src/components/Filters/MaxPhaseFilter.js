import React from 'react';
import { Box, IconButton, Typography, Paper } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

import CellQuality from '../Cells/CellQuality';
import { drawerStyles } from '../Drawer/drawerStyles';
import { qualityMidScale } from '../../data/columns';

function MaxPhaseFilter({
  name,
  value,
  showRemove,
  onChange,
  onRemove,
  title,
  description,
}) {
  const classes = drawerStyles();
  const colorScale = qualityMidScale(4);

  const handleChangeFilter = (value) => {
    onChange({ [name]: { $eq: value } });
  };

  const handleRemoveFilter = () => {
    onRemove(name);
  };

  return (
    <Paper classes={{ root: classes.drawerBodyShort }}>
      <Box display="flex" justifyContent="space-between" padding=".25rem .5rem">
        <Typography>{title}</Typography>
        {showRemove && (
          <IconButton onClick={handleRemoveFilter}>
            <ClearIcon />
          </IconButton>
        )}
      </Box>
      <Box display="flex" justifyContent="space-evenly" marginBottom=".5rem">
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
      {description && (
        <Box>
          <Typography className={classes.drawerBodyDescription}>
            {description}
          </Typography>
        </Box>
      )}
    </Paper>
  );
}

export default MaxPhaseFilter;
