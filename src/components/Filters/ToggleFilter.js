import React from 'react';
import _ from 'lodash';
import { Box, Paper } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

import Tooltip from '../Table/Tooltip';
import { FilterHeader } from './common';
import { filterStyles } from './filterStyles';

function ToggleFilter({
  name,
  onChange,
  onRemove,
  options = [],
  value,
  ...headerProps
}) {
  const classes = filterStyles();

  const handleChangeFilter = (_, value) => {
    onChange({ [name]: value });
  };

  const handleRemoveFilter = () => {
    onRemove(name);
  };

  const ButtonWrapper = ({ children, title }) =>
    title ? <Tooltip title={title}>{children}</Tooltip> : children;

  return (
    <Paper className={classes.filterContainer}>
      <FilterHeader onRemove={handleRemoveFilter} {...headerProps} />
      <Box className={classes.filterBodyContainerRow}>
        <ToggleButtonGroup
          exclusive
          onChange={handleChangeFilter}
          value={value}
        >
          {options.map((option, i) => {
            const isSelected = _.isEqual(value, option.value);

            return (
              <ToggleButton
                className={classes.toggleButton}
                key={i}
                onChange={handleChangeFilter}
                selected={isSelected}
                value={option.value}
              >
                <ButtonWrapper title={option.tooltip}>
                  <Box className={classes.toggleButtonContent}>
                    {option.label}
                  </Box>
                </ButtonWrapper>
              </ToggleButton>
            );
          })}
        </ToggleButtonGroup>
      </Box>
    </Paper>
  );
}

export default ToggleFilter;
