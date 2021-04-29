import React from 'react';
import clsx from 'clsx';
import { Box, colors, Link, makeStyles } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrosshairs, faFlask } from '@fortawesome/free-solid-svg-icons';

import Tooltip from '../Table/Tooltip';
import { cellStyles } from './cellStyles';

const usesStyles = (etPresent, tsPresent) =>
  makeStyles((theme) => ({
    et: { color: etPresent ? theme.primary : colors.grey[200] },
    ts: { color: tsPresent ? theme.primary : colors.grey[200] },
  }));

function CellSafetySource({ value, accession }) {
  const etPresent = value?.includes('experimental_toxicity');
  const tsPresent = value?.includes('known_target_safety');
  const classes = cellStyles();
  const presenceClasses = usesStyles(etPresent, tsPresent)();

  const IconWrapper = ({ title, children, present }) =>
    present ? (
      <Tooltip title={title}>
        <Link
          href={`https://platform.opentargets.org/target/${accession}`}
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
          <FontAwesomeIcon
            className={clsx(presenceClasses.et, classes.safetySourceIcon)}
            icon={faFlask}
            fixedWidth
          />
        </Box>
      </IconWrapper>

      <IconWrapper title="Target safety effects" present={tsPresent}>
        <Box>
          <FontAwesomeIcon
            className={clsx(presenceClasses.ts, classes.safetySourceIcon)}
            icon={faCrosshairs}
            fixedWidth
          />
        </Box>
      </IconWrapper>
    </Box>
  );
}

export default CellSafetySource;
