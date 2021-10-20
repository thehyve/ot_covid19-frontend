import React, { useState } from 'react';
import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';

import useDebounce from '../../hooks/useDebounce';
import useUpdateEffect from '../../hooks/useUpdateEffect';
import { FilterHeader } from './common';
import { filterStyles } from './filterStyles';

function numberWithThousandSeparators(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const useStyles = makeStyles((theme) => ({
  slider: {
    display: 'flex',
    justifyContent: 'space-evenly',
    margin: 'auto',
    marginTop: '0.5rem',
    width: '80%',
  },
  text: {
    color: theme.palette.grey[500],
    fontSize: '0.85rem',
    fontStyle: 'italic',
    paddingBottom: '.5rem',
    textAlign: 'center',
  },
}));

function RangeFilter({
  name,
  altName,
  onChange,
  onRemove,
  value,
  min = 0,
  max = 100,
  ...headerProps
}) {
  const sliderClasses = useStyles();
  const classes = filterStyles();

  const [range, setRange] = useState([min, max]);
  const debouncedRange = useDebounce(range, 1000);

  const handleRemoveFilter = () => {
    setRange([min, max]);
    onRemove(altName || name);
  };

  useUpdateEffect(() => {
    onChange({
      [name]: { $gte: debouncedRange[0], $lte: debouncedRange[1] },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedRange]);

  const handleChangeRange = (event, newRange) => {
    setRange(newRange);
  };

  return (
    <Paper className={classes.filterContainer}>
      <FilterHeader onRemove={handleRemoveFilter} {...headerProps} />
      <Box className={classes.filterBodyContainerRow}>
        <Slider
          className={sliderClasses.slider}
          value={range}
          min={min}
          max={max}
          onChange={handleChangeRange}
          valueLabelDisplay="off"
          aria-labelledby="range-slider"
          // getAriaValueText={(value) => `${value} n`}
        />
      </Box>
      <Box className={classes.filterBodyContainerRow}>
        <Typography
          className={sliderClasses.text}
        >{`Range: ${numberWithThousandSeparators(
          range[0]
        )} - ${numberWithThousandSeparators(range[1])}`}</Typography>
      </Box>
    </Paper>
  );
}

export default RangeFilter;
