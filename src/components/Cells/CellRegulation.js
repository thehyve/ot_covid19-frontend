import React from 'react';
import { Chip } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowAltCircleUp,
  faArrowAltCircleDown,
  faDotCircle,
} from '@fortawesome/free-solid-svg-icons';

import { cellStyles } from './cellStyles';
import { splitStringInParentheses } from '../../utils';

export function CellRegulationUnit({ direction, time }) {
  const classes = cellStyles();

  const getIcon = (direction) =>
    ({
      up: faArrowAltCircleUp,
      down: faArrowAltCircleDown,
      none: faDotCircle,
    }[direction]);

  return (
    <Chip
      icon={
        <FontAwesomeIcon
          className={classes.regulationIcon}
          icon={getIcon(direction)}
        />
      }
      label={time}
      size="small"
      style={{ marginRight: '.25rem' }}
    />
  );
}

function CellRegulation({ value }) {
  if (value === null) return <>Not altered</>;

  const values = value.split(';');

  return values
    .sort((a, b) => {
      const [aTime] = splitStringInParentheses(a);
      const [bTime] = splitStringInParentheses(b);

      // time ascending
      return parseInt(aTime) - parseInt(bTime);
    })
    .map((value, i) => {
      const [time, direction] = splitStringInParentheses(value);

      return <CellRegulationUnit key={i} direction={direction} time={time} />;
    });
}

export default CellRegulation;
