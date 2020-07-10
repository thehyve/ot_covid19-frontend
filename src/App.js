import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';

import ContentDrawer from './components/Drawer/ContentDrawer';
import CovidTable from './components/CovidTable';
import DrawerButton from './components/Drawer/DrawerButton';
import FilterDrawer from './components/Drawer/FilterDrawer';
import IndexingSnackbar from './components/IndexingSnackbar';
import NavBar from './components/NavBar/NavBar';
import OpenTargetsTitle from './components/NavBar/OpenTargetsTitle';
import TargetSearch from './components/NavBar/TargetSearch';
import WelcomeModal from './components/WelcomeModal';

import { createIndex, indexes } from './db/indexes';
import { getNewestDatasetRevision, updateClient } from './db/update';
import { getLS, setLS } from './utils';

function App() {
  const [content, setContent] = useState(null);
  const [contentOpen, setContentOpen] = useState(false);
  const [filterBy, setFilterBy] = useState([
    // { biotype: { $in: ['protein_coding'] } },
    // { Covid_direct_interactions: { $ne: null } },
    // { max_phase: { $eq: 4 } },
    // { drugs_in_clinic: { $gte: 2 } },
    // { invitro_covid_activity: { $regex: 'IN' } },
    // { has_safety_risk: { $eq: false } },
  ]);
  const [filterOpen, setFilterOpen] = useState(true);
  const [targetSearch, setTargetSearch] = useState('');
  const [updating, setUpdating] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showWelcomeCheck, setShowWelcomeCheck] = useState(true);
  const [indexing, setIndexing] = useState(false);
  const [indexingProgress, setIndexingProgress] = useState(0);
  const [ready, setReady] = useState(false);

  const handleCloseIndexing = (_, reason) => {
    if (reason === 'clickaway') return;

    setIndexing(false);
  };

  const handleOpenModal = () => {
    setShowWelcomeCheck(false);
    setShowWelcome(true);
  };

  const handleCloseModal = () => {
    setShowWelcome(false);
  };

  const handleSetContent = (content) => {
    setContent(content);
    setContentOpen(true);
  };

  const handleSetFilterBy = (filterBy) => {
    setFilterBy(filterBy);
    setFilterOpen(true);
  };

  const handleTargetSearch = (value) => {
    setTargetSearch(value);
  };

  const handleToggleContentDrawer = () => {
    setContentOpen(!contentOpen);
  };

  const handleToggleFilterDrawer = () => {
    setFilterOpen(!filterOpen);
  };

  useEffect(() => {
    async function checkLocalData() {
      const currentDatasetRevision = await getNewestDatasetRevision();
      const indexesReady = getLS('indexesReady');

      if (currentDatasetRevision) {
        setUpdating(true);
        await updateClient(currentDatasetRevision);
        setUpdating(false);
      }

      setReady(true);

      if (!indexesReady) {
        let indexesCreated = 0;
        setIndexing(true);

        for (const index of indexes) {
          await createIndex(index);
          indexesCreated++;
          setIndexingProgress(indexesCreated);
        }

        setLS('indexesReady', 'yes');
      }
      setIndexing(false);
    }

    setShowWelcome(!getLS('showWelcome'));
    checkLocalData();
  }, []);

  return (
    <div className="App">
      <NavBar name="Platform" openLeft={filterOpen} openRight={contentOpen}>
        <DrawerButton
          caption="filters"
          onClick={handleToggleFilterDrawer}
          open={!filterOpen}
          position="left"
        />
        <OpenTargetsTitle onClick={handleOpenModal} subtitle="COVID-19" />
        <TargetSearch
          contentOpen={contentOpen}
          onChange={handleTargetSearch}
          value={targetSearch}
        />
        <DrawerButton
          caption="content"
          onClick={handleToggleContentDrawer}
          open={!contentOpen}
          position="right"
        />
      </NavBar>

      <Box display="flex" alignItems="flex-start">
        <FilterDrawer
          filterBy={filterBy}
          onSetFilterBy={handleSetFilterBy}
          onToggleDrawer={handleToggleFilterDrawer}
          open={filterOpen}
        />
        {ready ? (
          <CovidTable
            filterBy={filterBy}
            onRequestFilter={handleSetFilterBy}
            onClickCellContent={handleSetContent}
            sideBarsOpen={[filterOpen, contentOpen]}
            targetSearch={targetSearch}
          />
        ) : (
          <Box display="flex" width="100%" />
        )}
        <ContentDrawer
          onToggleDrawer={handleToggleContentDrawer}
          open={contentOpen}
        >
          {content}
        </ContentDrawer>
      </Box>
      <WelcomeModal
        open={showWelcome}
        onClose={handleCloseModal}
        showWelcomeCheck={showWelcomeCheck}
        updating={updating}
      />
      <IndexingSnackbar
        open={indexing}
        onClose={handleCloseIndexing}
        indexCount={indexes.length}
        indexingProgress={indexingProgress}
      />
    </div>
  );
}

export default App;
