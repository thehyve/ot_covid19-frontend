import React, { useState, useEffect, memo } from 'react';
import _ from 'lodash';
import { Box } from '@material-ui/core';

import fetchDB from '../db/fetch';
import LoadingSnackbar from './LoadingSnackbar';
import Table from './Table/Table';
import { columns, headerGroups } from '../data/columns';
import { sideBarWidthPercent } from '../config';

function CovidTable({
  filterBy,
  onClickCellContent,
  onRequestFilter,
  sideBarsOpen,
}) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlockSize = 100000;
  const preparedColumns = columns(onClickCellContent);
  const width = `${
    100 - sideBarsOpen.filter((v) => v).length * sideBarWidthPercent
  }%`;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const newData = await fetchDB({
        limit: fetchBlockSize,
        selector: filterBy,
      });

      setRows(newData.rows);
      setLoading(false);
    }

    fetchData();
  }, [filterBy]);

  return (
    <>
      <Box style={{ overflowX: 'hidden', width }}>
        <Table
          columns={preparedColumns}
          filterBy={filterBy}
          headerGroups={headerGroups}
          noWrapHeader={false}
          onRequestFilter={onRequestFilter}
          order="asc"
          rows={rows}
          sortBy="covid_literature"
        />
      </Box>
      <LoadingSnackbar open={loading} />
    </>
  );
}

// Only rerender if filters/sideBarsOpen change.
export default memo(CovidTable, (prevProps, nextProps) => {
  const filtersChanged = !_.isEqual(prevProps.filterBy, nextProps.filterBy);
  const sideBarsOpenChanged = !_.isEqual(
    prevProps.sideBarsOpen,
    nextProps.sideBarsOpen
  );

  return !(filtersChanged || sideBarsOpenChanged);
});
