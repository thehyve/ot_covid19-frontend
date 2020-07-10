import React, { useRef, useState } from 'react';
import {
  Box,
  Grid,
  Table as MUITable,
  TableBody,
  TablePagination,
} from '@material-ui/core';
import clsx from 'clsx';

import TableHeader from './TableHeader';
import TablePaginationActions from './TablePaginationActions';
import TableRow from './TableRow';
import { prepareData } from './dataPreparation';
import { tableStyles } from './tableStyles';
import useDimensions from '../../hooks/useDimensions';
import { addFilter, includeFilter, remFilter } from '../Filters/utils';

function Table({
  className,
  columns,
  rows,
  rowCount,
  filterBy = [],
  fixed = false,
  fixedRows = [],
  headerGroups = [],
  onRequestFilter,
  onTableAction = () => {},
  pageSize = 10 - fixedRows.length,
  hover = false,
  serverSide = false,
  noWrap = true,
  noWrapHeader = true,
  targetSearch,
  ...props
}) {
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState(props.sortBy);
  const [order, setOrder] = useState(props.order || 'asc');
  const containerRef = useRef();
  const { height } = useDimensions(containerRef);

  pageSize = Math.floor((height - (98 + 36 + 15 + 1)) / 37);

  // eslint-disable-next-line no-unused-vars
  const [processedRows, effectiveRowCount] = prepareData(
    rows,
    columns,
    fixedRows,
    page,
    pageSize,
    order,
    sortBy,
    targetSearch
  );

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleRequestFilter = (newFilter) => {
    setPage(0);

    const defaultFilter = columns.find((column) => column.id === newFilter)
      ?.defaultFilter;

    let newFilterBy = filterBy;

    if (includeFilter(filterBy, newFilter)) {
      newFilterBy = remFilter(filterBy, newFilter);
    } else {
      newFilterBy = addFilter(filterBy, {
        [newFilter]: defaultFilter,
      });
    }

    onRequestFilter(newFilterBy);
  };

  const handleRequestSort = (_, property) => {
    if (sortBy === property) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    }

    setSortBy(property);
  };

  const classes = tableStyles();

  return (
    <Box className={classes.tableContainer} ref={containerRef}>
      <Box
        className={classes.tableRowContainer}
        style={{ height: `${height - 35}px` }}
      >
        <Grid container justify="flex-end" alignContent="center">
          <Grid item xs={12} className={classes.tableWrapper}>
            <MUITable
              classes={{
                root: clsx(classes.table, fixed && classes.tableFixed),
              }}
            >
              <TableHeader
                classes={classes}
                columns={columns}
                filterBy={filterBy}
                onRequestFilter={handleRequestFilter}
                headerGroups={headerGroups}
                noWrapHeader={noWrapHeader}
                order={order}
                sortBy={sortBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {processedRows.map((row, i) => (
                  <TableRow
                    columns={columns}
                    hover={hover}
                    isFixedRow={row.isFixedRow}
                    key={i}
                    row={row}
                    noWrap={noWrap}
                  />
                ))}
              </TableBody>
            </MUITable>
          </Grid>
        </Grid>
      </Box>
      <Grid item xs={12} className={classes.tablePagination}>
        <TablePagination
          ActionsComponent={TablePaginationActions}
          component="div"
          count={effectiveRowCount}
          onChangePage={handleChangePage}
          page={page}
          rowsPerPage={pageSize}
          rowsPerPageOptions={[]}
        />
      </Grid>
    </Box>
  );
}

export default Table;
