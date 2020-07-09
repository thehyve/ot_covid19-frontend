import React from 'react';
import { colors, makeStyles } from '@material-ui/core';

import Brightness1TwoToneIcon from '@material-ui/icons/Brightness1TwoTone';
import CheckCircleTwoTone from '@material-ui/icons/CheckCircleTwoTone';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import WarningTwoToneIcon from '@material-ui/icons/WarningTwoTone';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  colorGreen: { color: colors.green[500] },
  colorGrey: { color: colors.grey[500] },
  colorPrimary: { color: theme.palette.primary.main },
  colorRed: { color: colors.deepOrange.A400 },
  colorYellow: { color: colors.yellow[800] },
}));

export function IconTrue() {
  const classes = useStyles();
  return <CheckCircleTwoTone className={classes.colorGreen} />;
}

export function IconFalse() {
  const classes = useStyles();
  return <HighlightOffTwoToneIcon className={classes.colorRed} />;
}

export function IconExists() {
  const classes = useStyles();
  return <Brightness1TwoToneIcon className={classes.colorPrimary} />;
}

export function IconIndeterminate() {
  const classes = useStyles();
  return <RadioButtonUncheckedIcon className={classes.colorGrey} />;
}

export function IconWarning({ className }) {
  const classes = useStyles();
  return (
    <WarningTwoToneIcon className={clsx(classes.colorYellow, className)} />
  );
}
