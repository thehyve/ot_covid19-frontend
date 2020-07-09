import React from 'react';
import {
  Box,
  Hidden,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  withWidth,
  IconButton,
} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import HelpIcon from '@material-ui/icons/Help';
import clsx from 'clsx';
import _ from 'lodash';

import Tooltip from './Tooltip';
import useDynamicColspan from '../../hooks/useDynamicColspans';
import { getHiddenBreakpoints } from './utils';
import { tableStyles } from './tableStyles';
import { includeFilter } from '../Filters/utils';

function HeaderCell({
  colspan,
  isHeaderGroup = false,
  filterable = false,
  filterBy = [],
  id,
  label,
  labelStyle,
  minWidth,
  noWrapHeader,
  onRequestFilter,
  sortable = false,
  sortParams,
  sticky = false,
  tooltip,
  TooltipIcon = HelpIcon,
  width,
}) {
  const classes = tableStyles();
  const style = {
    minWidth,
    width,
    ...labelStyle,
  };
  const isFiltered = includeFilter(filterBy, id);

  const handleRequestFilter = () => {
    onRequestFilter(id);
  };

  const headerToolbar = (
    <Box className={classes.cellHeaderToolbar}>
      {tooltip && (
        <Tooltip title={tooltip}>
          <TooltipIcon
            className={clsx(classes.cellHeaderIcon, classes.cellHeaderIconHelp)}
          />
        </Tooltip>
      )}
      {sortable && (
        <Tooltip title="Sort the table using this column">
          <TableSortLabel
            classes={{
              root: classes.cellHeaderIcon,
              active: classes.cellHeaderIconActive,
            }}
            {...sortParams}
          />
        </Tooltip>
      )}
      {filterable && (
        <Tooltip title="Create a filter with this column">
          <IconButton
            className={clsx(
              classes.cellHeaderIcon,
              classes.cellHeaderIconFilter
            )}
            disableRipple
            onClick={handleRequestFilter}
          >
            <FilterListIcon
              className={clsx(isFiltered && classes.cellHeaderIconActive)}
            />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );

  return (
    <TableCell
      classes={{
        root: clsx(
          classes.cell,
          classes.cellHeader,
          isHeaderGroup && classes.cellGroup,
          sticky && classes.cellSticky,
          noWrapHeader && classes.noWrap
        ),
      }}
      colSpan={colspan}
      sortDirection={sortable && sortParams.direction}
      style={style}
    >
      {isHeaderGroup ? (
        <>{label}</>
      ) : (
        <Box className={classes.cellHeaderContainer}>
          <Box className={classes.cellHeaderLabel}>
            <span>{label}</span>
          </Box>
          {headerToolbar}
        </Box>
      )}
    </TableCell>
  );
}

function TableHeader({
  columns,
  filterBy,
  headerGroups,
  noWrapHeader,
  order,
  onRequestFilter,
  onRequestSort,
  sortBy,
  width,
}) {
  const colspans = useDynamicColspan(headerGroups, columns, width);
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headerGroups.map((headerCell, cellIndex) => (
          <HeaderCell
            colspan={colspans[cellIndex]}
            isHeaderGroup={true}
            key={cellIndex}
            label={headerCell.label || ''}
            noWrapHeader={noWrapHeader}
            sticky={headerCell.sticky || false}
            tooltip={headerCell.tooltip}
            tooltipStyle={headerCell.tooltipStyle || {}}
          />
        ))}
      </TableRow>
      <TableRow>
        {columns.map((column, index) => (
          <Hidden {...getHiddenBreakpoints(column)} key={index}>
            <HeaderCell
              align={
                column.align ? column.align : column.numeric ? 'right' : 'left'
              }
              filterable={column.filterable}
              filterBy={filterBy}
              id={column.id}
              label={column.label || _.startCase(column.id)}
              labelStyle={column.labelStyle}
              noWrapHeader={noWrapHeader}
              onRequestFilter={onRequestFilter}
              sortable={column.sortable}
              sortParams={
                column.sortable
                  ? {
                      active: sortBy === column.id,
                      direction: sortBy === column.id ? order : 'asc',
                      onClick: createSortHandler(column.id),
                    }
                  : null
              }
              sticky={column.sticky}
              tooltip={column.tooltip}
              tooltipStyle={column.tooltipStyle}
              width={column.width}
              minWidth={column.minWidth}
            />
          </Hidden>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default withWidth()(TableHeader);
