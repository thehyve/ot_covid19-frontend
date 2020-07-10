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
    [theme.breakpoints.down('md')]: {
      backgroundColor: 'rgb(82 155 210) !important',
      boxShadow: '-10px 0px 5px 5px rgb(52 137 202)',
    },
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'absolute',
    top: '8px',
    width: '100%',
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
    [theme.breakpoints.down('md')]: {
      left: '260px',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    zIndex: 2,
    position: 'absolute',
    top: '9px',
    left: 'calc(50vw - 123px)',
  },
  titleContainer: {
    display: 'flex',
    position: 'absolute',
    top: '9px',
    width: '100%',
  },
}));
