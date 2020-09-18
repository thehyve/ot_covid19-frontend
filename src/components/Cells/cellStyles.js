import { colors, makeStyles } from '@material-ui/core';

export const cellStyles = makeStyles((theme) => ({
  accordionSummaryRoot: {
    marginRight: '.25rem',
  },
  accordionSummaryContent: {
    minWidth: 0,
    whiteSpace: 'nowrap',
    '&$accordionSummaryExpanded': {
      margin: 0,
      whiteSpace: 'normal',
    },
  },
  accordionSummaryExpanded: {},
  booleanIconTrue: {
    color: colors.green[500],
  },
  booleanIconFalse: {
    color: colors.deepOrange.A400,
  },
  iconCell: {
    verticalAlign: 'middle',
  },
  geneticsTitle: {
    minWidth: 0,
    fontWeight: 'bold',
    whiteSpace: 'inherit',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
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
