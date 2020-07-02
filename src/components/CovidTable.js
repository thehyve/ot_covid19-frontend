import React, { useState, useEffect, memo } from 'react';
import _ from 'lodash';
import { Box } from '@material-ui/core';

import fetchDB from '../db/fetch';
import LoadingBox from './LoadingBox';
import Table from './Table/Table';
import { columns, headerGroups } from '../data/columns';
import { sideBarWidthPercent } from '../config';

function CovidTable({
  filters,
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
        selector: filters,
      });

      setRows(newData.rows);
      setLoading(false);
    }

    fetchData();
  }, [filters]);

  return loading ? (
    <LoadingBox width={width} />
  ) : (
    <Box style={{ overflowX: 'hidden', width }}>
      <Table
        columns={preparedColumns}
        filterBy={filters}
        headerGroups={headerGroups}
        noWrapHeader={false}
        onRequestFilter={onRequestFilter}
        order="desc"
        rows={rows}
        sortBy="drugs_in_covid_trials"
      />
    </Box>
  );
}

// There is nothing in props that should cause a rerender.
export default memo(CovidTable, (prevProps, nextProps) =>
  _.isEqual(prevProps.filters, nextProps.filters)
);
