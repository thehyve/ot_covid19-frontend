import React from 'react';
import {
  Box,
  Hidden,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Tooltip,
  withWidth,
  IconButton,
} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import HelpIcon from '@material-ui/icons/Help';
import clsx from 'clsx';
import _ from 'lodash';

import useDynamicColspan from '../../hooks/useDynamicColspans';
import { getHiddenBreakpoints } from './utils';
import { tableStyles } from './tableStyles';
import { includeFilter } from '../Filters/filters';

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
  console.log('isFiltered', isFiltered);

  const handleRequestFilter = () => {
    onRequestFilter(id);
  };

  const headerToolbar = (
    <Box className={classes.cellHeaderToolbar}>
      {tooltip && (
        <Tooltip
          arrow
          classes={{
            tooltip: classes.cellHeaderTooltip,
            arrow: classes.cellHeaderTooltipArrow,
          }}
          interactive
          title={tooltip}
        >
          <TooltipIcon className={classes.cellHeaderTooltipIcon} />
        </Tooltip>
      )}
      {sortable && (
        <TableSortLabel
          classes={{ icon: classes.cellHeaderSortIcon }}
          {...sortParams}
        />
      )}
      {filterable && (
        <IconButton
          className={classes.cellHeaderFilterIcon}
          disableRipple
          onClick={handleRequestFilter}
        >
          <FilterListIcon
            className={clsx(!isFiltered && classes.cellHeaderFilterIconOff)}
          />
        </IconButton>
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
