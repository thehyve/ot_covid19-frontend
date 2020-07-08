import { makeStyles } from '@material-ui/core';

export const filterStyles = makeStyles((theme) => ({
  filterContainer: {
    border: '1px solid #ccc',
    margin: '.25rem',
  },
  filterBodyContainerColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    margin: '0 .5rem .5rem .5rem',
  },
  filterBodyContainerRow: {
    display: 'flex',
    justifyContent: 'space-evenly',
    margin: '0 .5rem .5rem .5rem',
  },
  filterDescription: {
    color: theme.palette.grey[500],
    fontSize: '0.7rem',
    fontStyle: 'italic',
    marginBottom: '.5rem',
    padding: '0 .5rem',
  },
  filterTitle: {
    lineHeight: '2',
    // marginLeft: '2rem',
  },
  filterTitleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  multiListAutocomplete: {
    width: '100%',
  },
  multiListAutocompleteOption: {
    fontSize: '0.75rem',
  },
  multiListList: {
    margin: 0,
  },
  multiListListItem: {
    margin: '0 0 .25rem 0',
    padding: 0,
  },
  multiListListChip: {
    width: '100%',
    justifyContent: 'space-between',
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
