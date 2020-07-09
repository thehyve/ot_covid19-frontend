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
  },
  filterTitleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: '.5rem',
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
    borderRadius: 0,
    justifyContent: 'space-between',
    width: '100%',
  },
  toggleButton: {
    // CRA build bugfix
    padding: '0 !important',
  },
  toggleButtonContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '3rem',
    height: '2.5rem',
    padding: 0,
  },
}));
