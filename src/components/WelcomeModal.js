import React, { useState } from 'react';
import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  Fade,
  FormControlLabel,
  Link,
  Modal,
  makeStyles,
  Typography,
  Menu,
  MenuItem,
} from '@material-ui/core';
import ReactGA from 'react-ga';

import Logo from '../assets/logo';
import { setLS, getLS, delLS } from '../utils';
import { storeUrl } from '../config';
import Tooltip from './Table/Tooltip';

const useStyles = makeStyles((theme) => ({
  bottomControls: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
  controlLabel: {
    fontSize: '.75rem',
  },
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
    marginBottom: '3.5rem',
    width: '100%',
  },
  dontShowWelcomeRoot: {
    margin: 0,
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
  startButton: {
    marginBottom: '2rem',
  },
  titleContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
}));

function UpdatingModal({ open, onClose, updating, showControls }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dontShowWelcome, setDontShowWelcome] = useState(false);
  const clientDatasetRevision = getLS('datasetRevision');
  const datasetUrl = `${storeUrl}/${clientDatasetRevision}.zip`;
  const classes = useStyles();

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickClean = () => {
    delLS('showWelcome');
    delLS('datasetRevision');

    ReactGA.event({ category: 'Table', action: 'Refresh' });

    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    if (dontShowWelcome) {
      setLS('showWelcome', 'no');
    }

    ReactGA.event({ category: 'Modal', action: 'Close' });

    onClose();
  };

  const handleChangeDontShowWelcome = (e) => {
    setDontShowWelcome(e.target.checked);
  };

  const handleDownloadDataset = () => {
    ReactGA.event({ category: 'Table', action: 'Download' });
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
                  {showControls && (
                    <Typography variant="caption" className={classes.readyText}>
                      Data is ready.
                    </Typography>
                  )}
                  <Button
                    className={classes.startButton}
                    color="primary"
                    onClick={handleClose}
                  >
                    {showControls ? 'Start' : 'Continue'}
                  </Button>
                  <Box className={classes.bottomControls}>
                    <Button onClick={handleClickMenu}>More options...</Button>
                    <Menu
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleCloseMenu}
                    >
                      <MenuItem onClick={handleCloseMenu}>
                        <Link
                          className={classes.controlLabel}
                          color="inherit"
                          underline="none"
                          href={datasetUrl}
                          onClick={handleDownloadDataset}
                        >
                          Download dataset
                        </Link>
                      </MenuItem>
                      <Tooltip
                        title={
                          <>
                            Forces the tool to download the data again to your
                            device.
                            <br />
                            <br />
                            <strong>Note: </strong>Do not do this to get the
                            latest dataset. The dataset is updated automatically
                            to the latest available version. You should only do
                            this if you think something is wrong with the data.
                            If you use this option and it solves the problems
                            for you, we would be grateful if you{' '}
                            <Link
                              href="https://github.com/opentargets/ot_covid19-frontend/issues"
                              target="blank"
                            >
                              reported it
                            </Link>
                            .
                          </>
                        }
                      >
                        <MenuItem
                          className={classes.controlLabel}
                          onClick={handleClickClean}
                        >
                          <>Force data renew</>
                        </MenuItem>
                      </Tooltip>
                    </Menu>
                    {showControls && (
                      <FormControlLabel
                        classes={{
                          root: classes.dontShowWelcomeRoot,
                          label: classes.controlLabel,
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
