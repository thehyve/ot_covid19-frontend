import React from 'react';
import _ from 'lodash';
import { Box, Paper } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

import Tooltip from '../Table/Tooltip';
import { FilterHeader } from './common';
import { filterStyles } from './filterStyles';

function ToggleFilter({
  exclusive = true,
  name,
  onChange,
  onRemove,
  options = [],
  value,
  ...headerProps
}) {
  const classes = filterStyles();

  let innerValue = exclusive ? value : value?.$in || [];

  const handleChangeFilter = (e, newValue) => {
    // Some times, material-ui togglebutton does not let us toggle a button.
    if (_.isEqual(newValue, value)) {
      newValue = null;
    }

    if (!newValue || (!exclusive && !newValue.length)) {
      onRemove(name, true);
      return;
    }

    if (exclusive) {
      onChange({ [name]: newValue });
    } else {
      onChange({ [name]: { $in: [...newValue] } });
    }
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
          exclusive={exclusive}
          onChange={handleChangeFilter}
          value={innerValue}
        >
          {options.map((option, i) => {
            const isSelected = exclusive
              ? _.isEqual(innerValue, option.value)
              : innerValue.includes(option.value);

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
