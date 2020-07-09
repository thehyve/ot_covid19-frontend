import React from 'react';
import { Box } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';

import Drawer from './Drawer';
import DrawerHelp from './DrawerHelp';
import { addFilter, remFilter } from '../Filters/utils';
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

function FilterDrawer({ filterBy, onSetFilterBy, onToggleDrawer, open }) {
  const classes = drawerStyles();

  const handleChangeFilterBy = (newFilter) => {
    const newFilterObject = addFilter(filterBy, newFilter);
    onSetFilterBy(newFilterObject);
  };

  const handleRemoveFilterBy = (oldFilter) => {
    const newFilterObject = remFilter(filterBy, oldFilter);
    onSetFilterBy(newFilterObject);
  };

  const preparedFilters = filters(
    filterBy,
    handleChangeFilterBy,
    handleRemoveFilterBy
  );

  return (
    <Drawer
      caption="Filters"
      open={open}
      position="left"
      onHide={onToggleDrawer}
    >
      {!filterBy.length ? (
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
          {filterBy.map((f, i) => (
            <React.Fragment key={i}>
              {preparedFilters[Object.keys(f)[0]]}
              {i < filterBy.length - 1 && <FilterJoin />}
            </React.Fragment>
          ))}
        </Box>
      )}
    </Drawer>
  );
}

export default FilterDrawer;
