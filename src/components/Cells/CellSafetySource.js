import React from 'react';
import { Box, colors, Link, Tooltip, makeStyles } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrosshairs, faFlask } from '@fortawesome/free-solid-svg-icons';
import { tableStyles } from '../Table/tableStyles';

const usesStyles = (etPresent, tsPresent) =>
  makeStyles((theme) => ({
    et: {
      color: etPresent ? theme.primary : colors.grey[200],
      fontSize: '1.25rem',
    },
    ts: {
      color: tsPresent ? theme.primary : colors.grey[200],
      fontSize: '1.25rem',
    },
  }));

function CellSafetySource({ value, accession }) {
  const etPresent = value?.includes('experimental_toxicity');
  const tsPresent = value?.includes('known_target_safety');
  const classes = usesStyles(etPresent, tsPresent)();
  const tableClasses = tableStyles();

  const IconWrapper = ({ title, children, present }) =>
    present ? (
      <Tooltip
        title={title}
        arrow
        classes={{
          tooltip: tableClasses.cellHeaderTooltip,
          arrow: tableClasses.cellHeaderTooltipArrow,
        }}
      >
        <Link
          href={`https://alpha.targetvalidation.org/target/${accession}`}
          target="blank"
        >
          {children}
        </Link>
      </Tooltip>
    ) : (
      <>{children}</>
    );

  return (
    <Box display="flex" justifyContent="space-evenly">
      <IconWrapper
        title="Non-clinical experimental toxicity"
        present={etPresent}
      >
        <Box>
          <FontAwesomeIcon className={classes.et} icon={faFlask} fixedWidth />
        </Box>
      </IconWrapper>

      <IconWrapper title="Target safety effects" present={tsPresent}>
        <Box>
          <FontAwesomeIcon
            className={classes.ts}
            icon={faCrosshairs}
            fixedWidth
          />
        </Box>
      </IconWrapper>
    </Box>
  );
}

export default CellSafetySource;
