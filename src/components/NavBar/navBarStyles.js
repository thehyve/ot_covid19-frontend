import { fade, makeStyles } from '@material-ui/core';

export const navBarStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.primary.main,
    margin: 0,
    width: '100%',
    zIndex: theme.zIndex.drawer - 1,
  },
  toolBar: {
    justifyContent: 'space-between',
    padding: 0,
  },
  search: {
    position: 'relative',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: 'auto',
  },
  searchIcon: {
    padding: '0 .25rem',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearIcon: {
    color: '#fff',
  },
  clearIconInvisible: { visibility: 'hidden' },
  clearIconVisible: { visibility: 'visible' },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    paddingLeft: '2rem',
    transition: theme.transitions.create('width'),
    width: '7ch',
    '&:focus': {
      width: '16ch',
    },
  },
  titleButton: {
    margin: 'auto',
    [theme.breakpoints.down('md')]: {
      marginLeft: '260px',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  titleContainer: {
    display: 'flex',
    position: 'absolute',
    top: '10px',
    width: '100%',
    zIndex: -1,
  },
}));
