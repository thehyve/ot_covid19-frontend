import React from 'react';
import {
  Backdrop,
  Box,
  CircularProgress,
  Fade,
  Modal,
  makeStyles,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    maxWidth: '600px',
    minHeight: '250px',
    padding: theme.spacing(2, 4, 3),
    '&:focus': {
      outline: 'none',
    },
  },
}));

function UpdatingModal({ open }) {
  const classes = useStyles();

  return (
    <div>
      <Modal
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box className={classes.paper}>
            <Typography variant="h3">LOADING DATA</Typography>
            <Typography variant="caption" align="center">
              This is the first time you visit the Open Targets COVID-19, the
              dataset is being loaded into your computer. This will only happen
              once unless you delete the browser's storage data.
            </Typography>
            <CircularProgress />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default UpdatingModal;
