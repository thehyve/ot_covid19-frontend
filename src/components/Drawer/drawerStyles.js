import { darken, lighten } from 'polished';
import { colors, makeStyles } from '@material-ui/core';

export const drawerStyles = makeStyles((theme) => ({
  drawerContainer: {
    backgroundColor: theme.palette.grey[300],
    height: '100vh',
    minWidth: '250px',
    zIndex: theme.zIndex.drawer,
  },
  drawerBody: {
    border: '1px solid #ccc',
    height: 'calc(100vh - 3.5rem)',
    margin: '.25rem',
    overflowY: 'auto',
  },
  drawerBodyDescription: {
    color: theme.palette.grey[500],
    fontSize: '0.7rem',
    fontStyle: 'italic',
    marginBottom: '.5rem',
    padding: '0 .5rem',
  },
  drawerBodyNoBorder: {
    height: 'calc(100vh - 3.5rem)',
    margin: '.25rem',
    overflowY: 'auto',
  },
  drawerBodyShort: {
    border: '1px solid #ccc',
    margin: '.25rem',
  },
  drawerBodyTitle: {
    padding: '1rem',
  },
  drawerBodyIconHelp: {
    backgroundColor: theme.palette.grey[100],
    border: `1px solid ${theme.palette.grey[300]}`,
    verticalAlign: 'middle',
  },
  drawerBodyTextHelp: {
    padding: '1rem',
  },
  drawerOpen: {
    display: 'block',
  },
  drawerClosed: {
    display: 'none',
  },
  drawerTitle: {
    alignItems: 'center',
    backgroundColor: darken(0.05, theme.palette.primary.main),
    display: 'flex',
    height: '48px',
  },
  drawerTitleButton: {
    color: theme.palette.primary.contrastText,
    margin: '0 .5rem',
    padding: 0,
    zIndex: 2,
  },
  drawerTitleCaption: {
    color: theme.palette.grey[700],
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  drawerSubtitleCaption: {
    color: theme.palette.grey[500],
    fontSize: '0.8rem',
    fontStyle: 'italic',
  },
  filterJoin: {
    width: '3rem',
    margin: '.5rem auto',
    textAlign: 'center',
    border: `2px solid ${colors.green[500]}`,
    borderRadius: '25px',
    backgroundColor: lighten(0.3, colors.green[500]),
  },
}));
