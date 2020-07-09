import React from 'react';
import clsx from 'clsx';
import { Button, Typography, makeStyles } from '@material-ui/core';

import '../../assets/GothamRounded-Light.otf';
import '../../assets/GothamRounded-Medium.otf';

const useStyles = makeStyles({
  title: {
    fontFamily: 'Gotham Rounded, Sans',
    textTransform: 'capitalize',
  },
  titleThin: { fontWeight: 200 },
  titleMedium: { fontWeight: 350 },
});

function OpenTargetsTitle({ onClick, subtitle }) {
  const classes = useStyles();

  return (
    <Button color="inherit" onClick={onClick}>
      <Typography variant="h6" color="inherit">
        <span className={clsx(classes.title, classes.titleMedium)}>
          Open Targets{' '}
        </span>
        <span className={clsx(classes.title, classes.titleThin)}>
          {subtitle}
        </span>
      </Typography>
    </Button>
  );
}

export default OpenTargetsTitle;
