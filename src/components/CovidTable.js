import React, { useState, useEffect } from 'react';
import { Box } from '@material-ui/core';

import fetchDB from '../db/fetch';
import LoadingBox from './LoadingBox';
import Table from './Table/Table';
import { columns, headerGroups } from '../data/columns';
import { sideBarWidthPercent } from '../config';

function CovidTable({ filter, onClickCellContent, sideBarsOpen }) {
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
        selector: filter,
      });

      setRows(newData.rows);
      setLoading(false);
    }

    fetchData();
  }, [filter]);

  return loading ? (
    <LoadingBox width={width} />
  ) : (
    <Box style={{ overflowX: 'hidden', width }}>
      <Table
        columns={preparedColumns}
        headerGroups={headerGroups}
        noWrapHeader={false}
        rows={rows}
        sortBy="Covid_direct_interactions"
        order="desc"
      />
    </Box>
  );
}

export default CovidTable;
