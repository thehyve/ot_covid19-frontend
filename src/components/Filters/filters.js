import React from 'react';
import { Link } from '@material-ui/core';

import BooleanFilter from './BooleanFilter';
import { getFilter } from './utils';
import MaxPhaseFilter from './MaxPhaseFilter';

export const filters = (filterBy, onChange, onRemove) => ({
  'COVID-19 UniprotKB': (
    <BooleanFilter
      name="COVID-19 UniprotKB"
      key="COVID-19 UniprotKB"
      value={getFilter(filterBy, 'COVID-19 UniprotKB')}
      showRemove
      onChange={onChange}
      onRemove={onRemove}
      title="In COVID-19 UniprotKB"
      description={
        <span>
          Whether or not the target was included in the{' '}
          <Link href="https://covid-19.uniprot.org">
            COVID-19 Uniprot website
          </Link>
          .
        </span>
      }
    />
  ),
  Covid_direct_interactions: (
    <BooleanFilter
      name="Covid_direct_interactions"
      key="Covid_direct_interactions"
      value={getFilter(filterBy, 'Covid_direct_interactions')}
      integer
      showRemove
      onChange={onChange}
      onRemove={onRemove}
      title="Direct interactions"
      description={<span>Target directly interacts with a viral protein.</span>}
    />
  ),
  Covid_indirect_interactions: (
    <BooleanFilter
      name="Covid_indirect_interactions"
      key="Covid_indirect_interactions"
      value={getFilter(filterBy, 'Covid_indirect_interactions')}
      integer
      showRemove
      onChange={onChange}
      onRemove={onRemove}
      title="Indirect interactions"
      description={
        <span>
          Target interaction with one of the targets from the <i>Direct</i>{' '}
          column
        </span>
      }
    />
  ),
  max_phase: (
    <MaxPhaseFilter
      name="max_phase"
      key="max_phase"
      value={getFilter(filterBy, 'max_phase')}
      integer
      showRemove
      onChange={onChange}
      onRemove={onRemove}
      title="Max CT phase"
      description={
        <span>
          Max phase for any drug targeting this gene/protein for any indication.
        </span>
      }
    />
  ),
  has_drug_in_covid_trials: (
    <BooleanFilter
      name="has_drug_in_covid_trials"
      key="has_drug_in_covid_trials"
      value={getFilter(filterBy, 'has_drug_in_covid_trials')}
      nullAsFalse
      showRemove
      onChange={onChange}
      onRemove={onRemove}
      title="Drugs in COVID-19 CT"
      description={
        <span>
          Whether or not there are drugs in clinical trials for COVID-19 whose
          mechanism of action is to modulate the given target.
        </span>
      }
    />
  ),
});

// const basicFilters = (
//   <>
//     <BooleanFilter
//       name="FILTER_network"
//       value={getFilter(filterBy, 'FILTER_network')}
//       showRemove
//       onChange={handleChangeFilterBy}
//       onRemove={handleRemoveFilterBy}
//       title="In COVID-19 network"
//       description={
//         <span>
//           Target is in <strong>UniProt COVID-19</strong> set{' '}
//           <strong>or</strong> is part of the human-virus interactome{' '}
//           <strong>or</strong> interacts with a targets that interacts with a
//           viral protein.
//         </span>
//       }
//     />
//     <BooleanFilter
//       name="FILTER_network+drug"
//       value={getFilter(filterBy, 'FILTER_network+drug')}
//       showRemove
//       onChange={handleChangeFilterBy}
//       onRemove={handleRemoveFilterBy}
//       title="Phase III/IV Drug"
//       description={
//         <span>
//           Target fulfils criteria of the above filter <strong>and</strong>{' '}
//           also has a <strong>Phase III or IV drug</strong> available."
//         </span>
//       }
//     />
//     <BooleanFilter
//       name="FILTER_network+covid_tests"
//       value={getFilter(filterBy, 'FILTER_network+covid_tests')}
//       showRemove
//       onChange={handleChangeFilterBy}
//       onRemove={handleRemoveFilterBy}
//       title="In clinical trials"
//       description={
//         <span>
//           Target fulfils criteria in first filter <strong>or</strong> has drug
//           in <strong>COVID-19 clinical trial</strong> <strong>or</strong> has
//           active compound in <strong>COVID-19 in vitro assay</strong>.
//         </span>
//       }
//     />
//   </>
// );
