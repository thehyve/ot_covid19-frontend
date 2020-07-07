import React from 'react';
import {
  Box,
  colors,
  Tooltip,
  makeStyles,
  Paper,
  Typography,
  IconButton,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { ToggleButton } from '@material-ui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrosshairs, faFlask } from '@fortawesome/free-solid-svg-icons';

import { drawerStyles } from '../Drawer/drawerStyles';
import { tableStyles } from '../Table/tableStyles';

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
  value,
  showRemove = true,
  onChange,
  onRemove,
  title,
  description,
}) {
  const etPresent = value.$all?.includes('experimental_toxicity');
  const tsPresent = value.$all?.includes('known_target_safety');
  const classes = usesStyles(etPresent, tsPresent)();
  const drawerClasses = drawerStyles();
  const tableClasses = tableStyles();

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
        <Tooltip
          title={title}
          arrow
          classes={{
            tooltip: tableClasses.cellHeaderTooltip,
            arrow: tableClasses.cellHeaderTooltipArrow,
          }}
        >
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
    <Paper classes={{ root: drawerClasses.drawerBodyShort }}>
      <Box
        display="flex"
        justifyContent="space-between"
        padding=".25rem 0 .25rem .5rem"
      >
        <Typography variant="body1">{title}</Typography>
        {showRemove && (
          <IconButton onClick={handleRemoveFilter}>
            <ClearIcon />
          </IconButton>
        )}
      </Box>
      {description && (
        <Box>
          <Typography className={drawerClasses.drawerBodyDescription}>
            {description}
          </Typography>
        </Box>
      )}
      <Box display="flex" justifyContent="space-evenly" padding="1rem .5rem">
        <ButtonWrapper
          title="Non-clinical experimental toxicity"
          present={etPresent}
          presentString="experimental_toxicity"
        >
          <FontAwesomeIcon className={classes.et} icon={faFlask} fixedWidth />
        </ButtonWrapper>
        <ButtonWrapper
          title="Target safety effects"
          present={tsPresent}
          presentString="known_target_safety"
        >
          <FontAwesomeIcon
            className={classes.ts}
            icon={faCrosshairs}
            fixedWidth
          />
        </ButtonWrapper>
      </Box>
    </Paper>
  );
}

export default SafetySourceFilter;
