import React, { useState } from 'react';
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  Fade,
  Modal,
  makeStyles,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';

import Logo from '../assets/logo';
import { setLS, getLS } from '../utils';

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: '2rem 0 0 0',
    width: '75%',
  },
  readyContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  readyText: {
    textAlign: 'center',
    marginBottom: '4rem',
    width: '100%',
  },
  dontShowWelcomeLabel: {
    fontSize: '.75rem',
  },
  dontShowWelcomeRoot: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
  loadingContainer: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  loadingText: {
    textAlign: 'center',
    marginBottom: '1rem',
    width: '66%',
  },
  modal: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  modalLogo: {
    margin: '2rem',
  },
  paper: {
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '600px',
    minHeight: '500px',
    padding: theme.spacing(2, 4, 3),
    '&:focus': {
      outline: 'none',
    },
  },
  titleContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
}));

function UpdatingModal({ open, onClose, updating, showWelcomeCheck }) {
  const [dontShowWelcome, setDontShowWelcome] = useState(false);
  const classes = useStyles();

  const handleClose = () => {
    if (dontShowWelcome) {
      setLS('showWelcome', 'no');
    }

    onClose();
  };

  const handleChangeDontShowWelcome = (e) => {
    setDontShowWelcome(e.target.checked);
  };

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
            <Box className={classes.titleContainer}>
              <Logo className={classes.modalLogo} height="64px" />
              <Typography align="center">
                This tool aids filtering and prioritisation of human and viral
                proteins as potential drug targets for COVID-19 treatment. Key
                datasets from publicly available resources are parsed and
                integrated together in order to inform therapeutic hypothesis
                generation via a simple user interface.
              </Typography>

              <Divider variant="middle" className={classes.divider} />
            </Box>

            {updating ? (
              <Box className={classes.loadingContainer}>
                <Typography variant="h6">LOADING DATA</Typography>
                <Typography variant="caption" className={classes.loadingText}>
                  This is the first time you visit the Open Targets COVID-19
                  tool. The dataset is being loaded into your device. This will
                  only happen once unless you delete the browser's storage data.
                </Typography>
                <CircularProgress />
              </Box>
            ) : (
              <Fade in={!updating}>
                <Box className={classes.readyContainer}>
                  {showWelcomeCheck && (
                    <Typography variant="caption" className={classes.readyText}>
                      Data is ready.
                    </Typography>
                  )}
                  <Button onClick={handleClose} color="primary">
                    {showWelcomeCheck ? 'Start' : 'Continue'}
                  </Button>
                  {showWelcomeCheck && (
                    <FormControlLabel
                      classes={{
                        root: classes.dontShowWelcomeRoot,
                        label: classes.dontShowWelcomeLabel,
                      }}
                      control={
                        <Checkbox
                          checked={dontShowWelcome}
                          onChange={handleChangeDontShowWelcome}
                        />
                      }
                      label="Don't show this message"
                    />
                  )}
                </Box>
              </Fade>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default UpdatingModal;
