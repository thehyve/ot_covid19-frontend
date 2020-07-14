import React from 'react';
import { Box } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';

import Drawer from './Drawer';
import DrawerHelp from './DrawerHelp';
import { drawerStyles } from './drawerStyles';
import { filters } from '../Filters/filters';
import Tooltip from '../Table/Tooltip';

function FilterJoin({ type = 'AND' }) {
  const classes = drawerStyles();

  const filterCaption = (type) =>
    ({
      AND: 'The filter above and the filter below must both match',
      OR: 'Either the filter above or the filter below must match',
    }[type]);

  return (
    <Tooltip title={filterCaption(type)}>
      <Box className={classes.filterJoin}>{type}</Box>
    </Tooltip>
  );
}

function FilterDrawer({
  activeFilters,
  filterBy,
  onRemoveFilter,
  onSetFilterBy,
  onToggleDrawer,
  open,
}) {
  const classes = drawerStyles();

  const preparedFilters = filters(filterBy, onSetFilterBy, onRemoveFilter);

  return (
    <Drawer
      caption="Filters"
      open={open}
      position="left"
      onHide={onToggleDrawer}
    >
      {!activeFilters.length ? (
        <DrawerHelp
          title="No filters selected"
          content={
            <>
              Click on a{' '}
              <FilterListIcon className={classes.drawerBodyIconHelp} /> filter
              button in the header of a column to set up a filter.
            </>
          }
        />
      ) : (
        <Box className={classes.drawerBodyNoBorder}>
          {activeFilters.map((filter, i) => {
            return (
              <React.Fragment key={i}>
                {preparedFilters[filter]}
                {i < filterBy.length - 1 && <FilterJoin />}
              </React.Fragment>
            );
          })}
        </Box>
      )}
    </Drawer>
  );
}

export default FilterDrawer;
