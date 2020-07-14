import React, { useState, useEffect, memo } from 'react';
import _ from 'lodash';
import { Box, useMediaQuery, useTheme } from '@material-ui/core';

import fetchDB from '../db/fetch';
import LoadingSnackbar from './LoadingSnackbar';
import Table from './Table/Table';
import { columns, headerGroups } from '../data/columns';
import { sideBarWidthPercent } from '../config';

function CovidTable({
  activeFilters,
  filterBy,
  onClickCellContent,
  onToggleFilter,
  sideBarsOpen,
  targetSearch,
}) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const matchesSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const sideBarOpenCount = sideBarsOpen.filter((v) => v).length;

  const preparedColumns = columns(onClickCellContent);

  let width = '100%';

  if (matchesSmall && sideBarOpenCount) {
    width = '0%';
  } else {
    width = `${100 - sideBarOpenCount * sideBarWidthPercent}%`;
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const newData = await fetchDB({ selector: filterBy });

      setRows(newData.rows);
      setLoading(false);
    }

    fetchData();
  }, [filterBy]);

  return (
    <>
      <Box style={{ paddingTop: '3rem', overflowX: 'hidden', width }}>
        <Table
          activeFilters={activeFilters}
          columns={preparedColumns}
          headerGroups={headerGroups}
          noWrapHeader={false}
          onToggleFilter={onToggleFilter}
          order="asc"
          rows={rows}
          sortBy="covid_literature"
          targetSearch={targetSearch}
        />
      </Box>
      <LoadingSnackbar open={loading} />
    </>
  );
}

// Only rerender if filters/sideBarsOpen change.
export default memo(CovidTable, (prevProps, nextProps) => {
  const filtersChanged =
    !_.isEqual(prevProps.filterBy, nextProps.filterBy) ||
    !_.isEqual(prevProps.activeFilters, nextProps.activeFilters);
  const sideBarsOpenChanged = !_.isEqual(
    prevProps.sideBarsOpen,
    nextProps.sideBarsOpen
  );
  const targetSearchChanged = prevProps.targetSearch !== nextProps.targetSearch;

  return !(filtersChanged || sideBarsOpenChanged || targetSearchChanged);
});
