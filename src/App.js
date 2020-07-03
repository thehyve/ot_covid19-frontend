import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';

import OpenTargetsTitle from './components/NavBar/OpenTargetsTitle';
import NavBar from './components/NavBar/NavBar';
import DrawerButton from './components/Drawer/DrawerButton';
import ContentDrawer from './components/Drawer/ContentDrawer';
import CovidTable from './components/CovidTable';
import FilterDrawer from './components/Drawer/FilterDrawer';
import UpdatingModal from './components/UpdatingModal';
import IndexingSnackbar from './components/IndexingSnackbar';

import { createIndex, indexes } from './db/indexes';
import { getNewestDatasetRevision, updateClient } from './db/update';

function App() {
  const [content, setContent] = useState(null);
  const [contentOpen, setContentOpen] = useState(false);
  const [filters, setFilters] = useState([
    // { FILTER_network: { $eq: true } },
    // { biotype: { $in: ['protein_coding'] } },
  ]);
  const [filterOpen, setFilterOpen] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [indexing, setIndexing] = useState(false);
  const [indexingProgress, setIndexingProgress] = useState(0);
  const [ready, setReady] = useState(false);

  const handleCloseIndexing = (_, reason) => {
    if (reason === 'clickaway') return;

    setIndexing(false);
  };

  const handleSetContent = (content) => {
    setContent(content);
    setContentOpen(true);
  };

  const handleSetFilters = (filters) => {
    console.log('setting filters', filters);
    setFilters(filters);
  };

  const handleToggleContentDrawer = () => {
    setContentOpen(!contentOpen);
  };

  const handleToggleFilterDrawer = () => {
    setFilterOpen(!filterOpen);
  };

  useEffect(() => {
    async function checkRevisionAndUpdate() {
      const currentDatasetRevision = await getNewestDatasetRevision();

      if (currentDatasetRevision) {
        setUpdating(true);
        await updateClient(currentDatasetRevision);
        setUpdating(false);

        setReady(true);

        setIndexing(true);
        let indexesCreated = 0;
        for (const index of indexes) {
          await createIndex(index);
          indexesCreated++;
          setIndexingProgress(indexesCreated);
        }
        setIndexing(false);
      }

      setReady(true);
    }

    checkRevisionAndUpdate();
  }, []);

  return (
    <div className="App">
      <NavBar name="Platform" openLeft={filterOpen} openRight={contentOpen}>
        <DrawerButton
          onClick={handleToggleFilterDrawer}
          open={!filterOpen}
          position="left"
        />
        <OpenTargetsTitle subtitle="COVID-19" />
        <DrawerButton
          onClick={handleToggleContentDrawer}
          open={!contentOpen}
          position="right"
        />
      </NavBar>

      <Box display="flex" alignItems="flex-start">
        <FilterDrawer
          filters={filters}
          onSetFilter={handleSetFilters}
          onToggleDrawer={handleToggleFilterDrawer}
          open={filterOpen}
        />
        {ready ? (
          <CovidTable
            filters={filters}
            onRequestFilter={handleSetFilters}
            onClickCellContent={handleSetContent}
            sideBarsOpen={[filterOpen, contentOpen]}
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
      <UpdatingModal open={updating} />
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
