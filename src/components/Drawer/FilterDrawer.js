import React from 'react';
import { Box } from '@material-ui/core';

import Drawer from './Drawer';

import BooleanFilter from './Filters/BooleanFilter';
import MultiListFilter from './Filters/MultiListFilter';
import { biotypeList } from '../../data/maps';
import { drawerStyles } from './drawerStyles';
import StringFilter from './Filters/StringFilter';

const remFilter = (filterObj, oldFilter) =>
  filterObj.filter((f) => !Object.keys(f).includes(oldFilter));

const getFilter = (filterObj, curFilter) =>
  filterObj.find((f) => Object.keys(f).includes(curFilter))?.[curFilter];

const addFilter = (filterObj, newFilter) => [
  ...remFilter(filterObj, Object.keys(newFilter)[0]),
  newFilter,
];

function FilterDrawer({ filter, onSetFilter, onToggleDrawer, open }) {
  const classes = drawerStyles();

  const handleChangeFilter = (newFilter) => {
    const newFilterObject = addFilter(filter, newFilter);
    onSetFilter(newFilterObject);
  };

  const handleRemoveFilter = (oldFilter) => {
    const newFilterObject = remFilter(filter, oldFilter);
    onSetFilter(newFilterObject);
  };

  return (
    <Drawer title="Filters" open={open} position="left">
      <Box className={classes.drawerBodyNoBorder}>
        <BooleanFilter
          name="FILTER_network"
          value={getFilter(filter, 'FILTER_network')}
          showRemove
          onChange={handleChangeFilter}
          onRemove={handleRemoveFilter}
          title="In COVID-19 network"
          description={
            <span>
              Target is in <strong>UniProt COVID-19</strong> set{' '}
              <strong>or</strong> is part of the human-virus interactome{' '}
              <strong>or</strong> interacts with a targets that interacts with a
              viral protein.
            </span>
          }
        />
        <BooleanFilter
          name="FILTER_network+drug"
          value={getFilter(filter, 'FILTER_network+drug')}
          showRemove
          onChange={handleChangeFilter}
          onRemove={handleRemoveFilter}
          title="Phase III/IV Drug"
          description={
            <span>
              Target fulfils criteria of the above filter <strong>and</strong>{' '}
              also has a <strong>Phase III or IV drug</strong> available."
            </span>
          }
        />
        <BooleanFilter
          name="FILTER_network+covid_tests"
          value={getFilter(filter, 'FILTER_network+covid_tests')}
          showRemove
          onChange={handleChangeFilter}
          onRemove={handleRemoveFilter}
          title="In clinical trials"
          description={
            <span>
              Target fulfils criteria in first filter <strong>or</strong> has
              drug in <strong>COVID-19 clinical trial</strong>{' '}
              <strong>or</strong> has active compound in{' '}
              <strong>COVID-19 in vitro assay</strong>.
            </span>
          }
        />
        <BooleanFilter
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
        />
      </Box>
    </Drawer>
  );
}

export default FilterDrawer;
