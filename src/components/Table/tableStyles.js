import { makeStyles } from '@material-ui/core';

export const tableStyles = makeStyles((theme) => ({
  cell: {
    '&:first-child': {
      paddingLeft: '1rem',
    },
    '&:last-child': {
      paddingRight: '1rem',
    },
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
  cellHeaderFilterIcon: {
    height: '1rem',
    margin: '0 .2rem',
    width: '1rem',
    '& span': {
      '& svg': {
        fontSize: '1.33rem',
        '&:hover': {
          opacity: 0.5,
        },
      },
    },
  },
  cellHeaderFilterIconOff: {
    opacity: 0.2,
  },
  cellHeaderSortIcon: {
    // Override cascading bug when building bundle
    '& svg': {
      opacity: 0.2,
      margin: '0 .1rem',
    },
  },
  cellHeaderToolbar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.grey[100],
    border: `1px solid ${theme.palette.grey[200]}`,
  },
  cellHeaderTooltip: {
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.grey[300]}`,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
  cellHeaderTooltipArrow: {
    '&:before': {
      backgroundColor: theme.palette.common.white,
      border: `1px solid ${theme.palette.grey[300]}`,
    },
  },
  cellHeaderTooltipIcon: {
    fontSize: '1rem',
    margin: '0 .1rem',
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
}));

export const globalSearchStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));
