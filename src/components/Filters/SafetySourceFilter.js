import React from 'react';
import { Box, colors, makeStyles, Paper } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrosshairs, faFlask } from '@fortawesome/free-solid-svg-icons';
import { ToggleButton } from '@material-ui/lab';

import Tooltip from '../Table/Tooltip';
import { FilterHeader } from './common';
import { filterStyles } from './filterStyles';

const usesStyles = (etPresent, tsPresent) =>
  makeStyles((theme) => ({
    et: {
      color: etPresent ? theme.palette.primary.main : colors.grey[200],
      fontSize: '1.25rem',
    },
    ts: {
      color: tsPresent ? theme.palette.primary.main : colors.grey[200],
      fontSize: '1.25rem',
    },
  }));

function SafetySourceFilter({
  name,
  onChange,
  onRemove,
  value,
  ...headerProps
}) {
  const etPresent = value.$all?.includes('experimental_toxicity');
  const tsPresent = value.$all?.includes('known_target_safety');
  const buttonClasses = usesStyles(etPresent, tsPresent)();
  const classes = filterStyles();

  const handleToggle = (entryValue, entryString) => {
    let newValue;

    if (entryValue) {
      newValue = value.$all.filter((e) => e !== entryString);
    } else {
      newValue = [...value.$all, entryString];
    }

    if (!newValue.length) {
      onRemove(name);
      return;
    }

    onChange({ [name]: { $all: newValue } });
  };

  const handleRemoveFilter = () => {
    onRemove(name);
  };

  const ButtonWrapper = ({ title, children, present, presentString }) => {
    const handleChange = () => {
      handleToggle(present, presentString);
    };

    return (
      <Box>
        <Tooltip title={title}>
          <ToggleButton
            onChange={handleChange}
            value={title}
            selected={present}
          >
            {children}
          </ToggleButton>
        </Tooltip>
      </Box>
    );
  };

  return (
    <Paper className={classes.filterContainer}>
      <FilterHeader onRemove={handleRemoveFilter} {...headerProps} />
      <Box className={classes.filterBodyContainerRow}>
        <ButtonWrapper
          title="Non-clinical experimental toxicity"
          present={etPresent}
          presentString="experimental_toxicity"
        >
          <FontAwesomeIcon
            className={buttonClasses.et}
            icon={faFlask}
            fixedWidth
          />
        </ButtonWrapper>
        <ButtonWrapper
          title="Target safety effects"
          present={tsPresent}
          presentString="known_target_safety"
        >
          <FontAwesomeIcon
            className={buttonClasses.ts}
            icon={faCrosshairs}
            fixedWidth
          />
        </ButtonWrapper>
      </Box>
    </Paper>
  );
}

export default SafetySourceFilter;
