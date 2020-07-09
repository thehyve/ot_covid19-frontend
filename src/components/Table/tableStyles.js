import { makeStyles } from '@material-ui/core';

export const tableStyles = makeStyles((theme) => ({
  cell: {
    '&:first-child': {
      paddingLeft: '1rem',
    },
    '&:last-child': {
      paddingRight: '1rem',
    },
    height: '2.3125rem',
  },
  cellBody: {
    padding: '.25rem .5rem',
    fontSize: '0.8125rem',
  },
  cellHeader: {
    borderRight: `1px solid ${theme.palette.grey[200]}`,
    fontSize: '.75rem',
    lineHeight: '.8rem',
    padding: '.33rem .5rem',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  cellHeaderContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '2.7rem',
    padding: '0 .25rem',
    justifyContent: 'space-between',
  },
  cellHeaderLabel: {
    alignItems: 'center',
    display: 'flex',
    flexGrow: 1,
  },
  cellHeaderIcon: {
    '& span, & svg': {
      opacity: 1,
    },
    '&:hover': {
      color: theme.palette.primary.main,
      opacity: 1,
      '& svg': { opacity: '1 !important' },
    },
  },
  cellHeaderIconActive: {
    opacity: 1,
    color: theme.palette.secondary.main,
    '& svg': { color: `${theme.palette.secondary.main} !important` },
  },
  cellHeaderIconHelp: {
    fontSize: '1rem',
    margin: '0 .1rem',
  },
  cellHeaderIconFilter: {
    height: '1rem',
    fontSize: '1.33rem',
    margin: '0 .2rem',
    width: '1rem',
  },
  cellHeaderToolbar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.grey[100],
    border: `1px solid ${theme.palette.grey[200]}`,
  },
  cellGroup: {
    padding: '1rem',
    borderLeft: '1px solid #E0E0E0',
    '&:first-child': {
      borderLeft: 'none',
    },
  },
  cellSticky: {
    backgroundColor: theme.palette.grey[100],
    left: 0,
    position: 'sticky',
    zIndex: 2,
  },
  rowFixed: {
    backgroundColor: theme.palette.grey[300],
  },
  noData: {
    textAlign: 'center',
  },
  noWrap: {
    whiteSpace: 'nowrap',
  },
  table: {
    tableLayout: 'auto',
    width: '100%',
  },
  tableContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 3rem)',
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  tableRowContainer: {
    height: 'calc(100vh - 7rem)',
    overflowX: 'scroll',
    overflowY: 'auto',
  },
  tableFixed: {
    tableLayout: 'fixed',
  },
  tablePagination: {
    order: 9,
    flex: 0,
  },
  tableUpperControl1: {
    marginBottom: '2rem',
    order: 0,
    [theme.breakpoints.down('sm')]: {
      order: 1,
    },
  },
  tableUpperControl2: {
    marginBottom: '2rem',
    order: 1,
    [theme.breakpoints.down('sm')]: {
      order: 0,
    },
  },
  tableWrapper: {
    order: 8,
  },
  tabularNums: {
    fontVariant: 'tabular-nums',
  },
  // The !important tags solve Stylesheet conflicts on production build bug.
  tooltip: {
    backgroundColor: `${theme.palette.common.white} !important`,
    border: `1px solid ${theme.palette.grey[300]} !important`,
    color: `${theme.palette.text.primary} !important`,
    boxShadow: `${theme.shadows[1]} !important`,
    fontSize: `11 !important`,
  },
  // The !important tags solve Stylesheet conflicts on production build bug.
  tooltipArrow: {
    '&:before': {
      backgroundColor: `${theme.palette.common.white} !important`,
      border: `1px solid ${theme.palette.grey[300]} !important`,
    },
  },
}));

export const globalSearchStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));
