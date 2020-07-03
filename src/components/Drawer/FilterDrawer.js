import React from 'react';
import { Box } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';

import Drawer from './Drawer';
import DrawerHelp from './DrawerHelp';
import { drawerStyles } from './drawerStyles';
import { addFilter, remFilter } from '../Filters/utils';
import { filters } from '../Filters/filters';

function FilterDrawer({ filterBy, onSetFilterBy, open }) {
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
    <Drawer title="Filters" open={open} position="left">
      <Box className={classes.drawerBodyNoBorder}>
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
          filterBy.map((f) => preparedFilters[Object.keys(f)[0]])
        )}
      </Box>
    </Drawer>
  );
}

export default FilterDrawer;

/*<BooleanFilter
          name="Implicated_in_viral_infection"
          value={getFilter(filter, 'Implicated_in_viral_infection')}
          showRemove
          onChange={handleChangeFilter}
          onRemove={handleRemoveFilter}
          title="Implicated in viral infection"
          description={
            <span>
              Target does not interact with a{' '}
              <strong>CoV-SARS-X protein</strong> but interacts with another
              virus.
            </span>
          }
        />
        <MultiListFilter
          list={biotypeList}
          name="biotype"
          value={getFilter(filter, 'biotype')}
          showRemove
          onChange={handleChangeFilter}
          onRemove={handleRemoveFilter}
          title="Gene biotype"
          description={<span>Select biotypes to show relevant entries.</span>}
        />
        <StringFilter
          name="uniprot_ids"
          value={getFilter(filter, 'uniprot')}
          showRemove
          onChange={handleChangeFilter}
          onRemove={handleRemoveFilter}
          title="UniProt ID"
          description={<span>Write a UniProt ID to search in the list.</span>}
        /> */
