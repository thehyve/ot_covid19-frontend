import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Grid,
  Table as MUITable,
  TableBody,
  TableCell,
  TablePagination,
  TableRow as MUITableRow,
} from '@material-ui/core';

import DataDownloader from './DataDownloader';
import GlobalFilter from './GlobalFilter';
import TableHeader from './TableHeader';
import TablePaginationActions from './TablePaginationActions';
import TableRow from './TableRow';
import {
  prepareDataClientSide,
  prepareDataServerSide,
} from './dataPreparation';
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
  dataDownloader = false,
  dataDownloaderFileStem = 'data',
  dataDownloaderRows = rows,
  hover = false,
  serverSide = false,
  showGlobalFilter = false,
  noWrap = true,
  noWrapHeader = true,
  ...props
}) {
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState(props.sortBy);
  const [order, setOrder] = useState(props.order || 'asc');
  const [globalFilter, setGlobalFilter] = useState('');
  const containerRef = useRef();
  const { height } = useDimensions(containerRef);

  pageSize = Math.floor((height - (98 + 36 + 15 + 1)) / 37);

  const [processedRows, emptyRows, effectiveRowCount = rowCount] = serverSide
    ? prepareDataServerSide(rows, fixedRows, pageSize)
    : prepareDataClientSide(
        rows,
        columns,
        fixedRows,
        page,
        pageSize,
        order,
        sortBy,
        globalFilter
      );

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleRequestFilter = (newFilter) => {
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

  const handleChangeGlobalFilter = (newValue) => {
    if (globalFilter !== newValue) {
      setPage(0);
      setGlobalFilter(newValue);
    }
  };

  useEffect(
    () => {
      async function asyncTableAction() {
        await onTableAction({ page, pageSize, sortBy, order, globalFilter });
      }

      asyncTableAction();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, pageSize, sortBy, order, globalFilter]
  );

  const classes = tableStyles();

  return (
    <Box className={classes.tableContainer} ref={containerRef}>
      <Box
        className={classes.tableRowContainer}
        style={{ height: `${height - 35}px` }}
      >
        <Grid container justify="flex-end" alignContent="center">
          {showGlobalFilter && (
            <Grid
              item
              xs={12}
              md={5}
              lg={7}
              className={classes.tableUpperControl1}
            >
              <GlobalFilter onGlobalFilterChange={handleChangeGlobalFilter} />
            </Grid>
          )}

          {dataDownloader && (
            <Grid
              item
              xs={12}
              md={7}
              lg={5}
              className={classes.tableUpperControl2}
            >
              <DataDownloader
                columns={columns}
                rows={dataDownloaderRows}
                fileStem={dataDownloaderFileStem}
              />
            </Grid>
          )}

          <Grid item xs={12} className={classes.tableWrapper}>
            <MUITable
              classes={{
                root: `${classes.table} ${fixed ? classes.tableFixed : ''}`,
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
                {noWrap && emptyRows > 0 && (
                  <MUITableRow style={{ height: `${1.6875 * emptyRows}rem` }}>
                    <TableCell
                      colSpan={columns.length}
                      classes={{
                        root: `${classes.cellBody} ${classes.noData}`,
                      }}
                    >
                      {!processedRows.length && 'No data'}
                    </TableCell>
                  </MUITableRow>
                )}
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
