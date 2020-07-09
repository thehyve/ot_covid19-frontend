import { colors, makeStyles } from '@material-ui/core';

export const cellStyles = makeStyles((theme) => ({
  booleanIconTrue: {
    color: colors.green[500],
  },
  booleanIconFalse: {
    color: colors.deepOrange.A400,
  },
  iconCell: {
    verticalAlign: 'middle',
  },
  naLabel: {
    border: `1px solid ${theme.palette.grey[500]}`,
    backgroundColor: theme.palette.grey[500],
    borderRadius: '50px',
    width: '1.25rem',
  },
  naLabelCenter: {
    margin: 'auto',
  },
  qualityContainer: {
    borderRadius: '25px',
    padding: '0 .25rem',
    margin: 'auto',
    textAlign: 'center',
    width: '3rem',
  },
  regulationIcon: {
    color: theme.palette.grey[700],
    fontSize: '1.25rem',
  },
  safetyHasIcon: {
    color: colors.yellow[800],
  },
  safetySourceIcon: {
    fontSize: '1.25rem',
  },
}));
