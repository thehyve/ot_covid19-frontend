import { makeStyles } from '@material-ui/core';
import { sideBarWidthPercent } from '../../config';

export const drawerStyles = makeStyles((theme) => ({
  drawerContainer: {
    backgroundColor: theme.palette.grey[300],
    minWidth: '250px',
    width: `${sideBarWidthPercent}%`,
    height: 'calc(100vh - 3rem)',
    zIndex: 10,
  },
  drawerBody: {
    border: '1px solid #ccc',
    height: 'calc(100vh - 7.5rem)',
    margin: '.25rem',
    overflowY: 'auto',
  },
  drawerBodyNoBorder: {
    height: 'calc(100vh - 7.5rem)',
    margin: '.25rem',
    overflowY: 'auto',
  },
  drawerBodyShort: {
    border: '1px solid #ccc',
    margin: '.25rem',
    padding: '.25rem .25rem .5rem .25rem',
  },
  drawerBodyTitle: {
    padding: '1rem',
  },
  drawerBodyDescription: {
    color: theme.palette.grey[500],
    fontSize: '0.7rem',
    fontStyle: 'italic',
    padding: '0 .5rem',
    textAlign: 'justify',
  },
  drawerOpen: {
    display: 'block',
  },
  drawerClosed: {
    display: 'none',
  },
  drawerTitle: {
    borderBottom: '1px solid #ccc',
    padding: '1rem',
  },
  drawerTitleCaption: {
    color: theme.palette.grey[700],
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  drawerSubtitleCaption: {
    color: theme.palette.grey[400],
    fontSize: '0.8rem',
    fontStyle: 'italic',
  },
}));
