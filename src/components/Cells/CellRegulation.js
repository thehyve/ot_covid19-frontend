import React from 'react';
import { makeStyles, Chip } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowAltCircleUp,
  faArrowAltCircleDown,
  faDotCircle,
} from '@fortawesome/free-solid-svg-icons';

import { splitStringInParentheses } from '../../utils';

const usesStyles = makeStyles((theme) => ({
  cellRegulationIcon: {
    color: theme.palette.grey[700],
    fontSize: '1.25rem',
  },
}));

export function CellRegulationUnit({ direction, time }) {
  const classes = usesStyles();

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
          className={classes.cellRegulationIcon}
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

  return values.map((value, i) => {
    const [time, direction] = splitStringInParentheses(value);

    return <CellRegulationUnit key={i} direction={direction} time={time} />;
  });
}

export default CellRegulation;
