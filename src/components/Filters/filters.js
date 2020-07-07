import React from 'react';

import BooleanFilter from './BooleanFilter';
import IntegerFilter from './IntegerFilter';
import ListFilter from './ListFilter';
import MaxPhaseFilter from './MaxPhaseFilter';
import MultiListFilter from './MultiListFilter';
import SafetySourceFilter from './SafetySourceFilter';
import StringFilter from './StringFilter';

import * as tooltips from '../../data/tooltips';

import { getFilter } from './utils';

import {
  biotypeList,
  subcellularLocationList,
  tissueDistributionList,
  tissueSpecificityList,
} from '../../data/maps';

export const filters = (filterBy, onChange, onRemove) => ({
  biotype: (
    <MultiListFilter
      name="biotype"
      key="biotype"
      list={biotypeList}
      value={getFilter(filterBy, 'biotype')}
      onChange={onChange}
      onRemove={onRemove}
      title="Gene biotype"
    />
  ),
  'COVID-19 UniprotKB': (
    <BooleanFilter
      name="COVID-19 UniprotKB"
      key="COVID-19 UniprotKB"
      value={getFilter(filterBy, 'COVID-19 UniprotKB')}
      onChange={onChange}
      onRemove={onRemove}
      title="In COVID-19 UniprotKB"
      description={tooltips.uniprotCovidTooltip}
    />
  ),
  Covid_direct_interactions: (
    <ListFilter
      name="Covid_direct_interactions"
      key="Covid_direct_interactions"
      value={getFilter(filterBy, 'Covid_direct_interactions')}
      onChange={onChange}
      onRemove={onRemove}
      title="Direct interactions"
      description="Target directly interacts with a viral protein."
    />
  ),
  Covid_indirect_interactions: (
    <ListFilter
      name="Covid_indirect_interactions"
      key="Covid_indirect_interactions"
      value={getFilter(filterBy, 'Covid_indirect_interactions')}
      onChange={onChange}
      onRemove={onRemove}
      title="Indirect interactions"
      description="Target interacts with one of the targets from the Direct column."
    />
  ),
  max_phase: (
    <MaxPhaseFilter
      name="max_phase"
      key="max_phase"
      value={getFilter(filterBy, 'max_phase')}
      integer
      onChange={onChange}
      onRemove={onRemove}
      title="Max phase"
      description="Max clinical trial phase for any drug targeting this gene/protein for any indication."
    />
  ),
  drugs_in_clinic: (
    <IntegerFilter
      name="drugs_in_clinic"
      key="drugs_in_clinic"
      value={getFilter(filterBy, 'drugs_in_clinic')}
      onChange={onChange}
      onRemove={onRemove}
      title="Drugs in clinic"
      description="Number of drugs in clinical trials for a given target."
    />
  ),
  invitro_covid_activity: (
    <StringFilter
      name="invitro_covid_activity"
      key="invitro_covid_activity"
      value={getFilter(filterBy, 'invitro_covid_activity')}
      capitalize
      onChange={onChange}
      onRemove={onRemove}
      title="In-vitro compound activity"
      description="Compounds modulating given target that have been tested in in-vitro assays and whether they were active or not."
      placeholder="Search by compound"
    />
  ),
  hpa_rna_tissue_distribution: (
    <MultiListFilter
      name="hpa_rna_tissue_distribution"
      key="hpa_rna_tissue_distribution"
      list={tissueDistributionList}
      value={getFilter(filterBy, 'hpa_rna_tissue_distribution')}
      onChange={onChange}
      onRemove={onRemove}
      title="RNA tissue distribution"
      description="Expression distribution in different tissues."
    />
  ),
  hpa_rna_tissue_specificity: (
    <MultiListFilter
      name="hpa_rna_tissue_specificity"
      key="hpa_rna_tissue_specificity"
      list={tissueSpecificityList}
      value={getFilter(filterBy, 'hpa_rna_tissue_specificity')}
      onChange={onChange}
      onRemove={onRemove}
      title="RNA tissue specificity"
      description="Expression specificity in different tissues."
    />
  ),
  hpa_rna_specific_tissues: (
    <StringFilter
      name="hpa_rna_specific_tissues"
      key="hpa_rna_specific_tissues"
      value={getFilter(filterBy, 'hpa_rna_specific_tissues')}
      onChange={onChange}
      onRemove={onRemove}
      title="RNA specific tissues"
      description="List of tissues if target expression has some degree of specificity."
      placeholder="Specific to..."
    />
  ),
  has_drug_in_covid_trials: (
    <BooleanFilter
      name="has_drug_in_covid_trials"
      key="has_drug_in_covid_trials"
      value={getFilter(filterBy, 'has_drug_in_covid_trials')}
      onChange={onChange}
      onRemove={onRemove}
      title="Drugs in COVID-19 CT"
      description="Whether or not there are drugs in clinical trials for COVID-19 whose mechanism of action is to modulate the given target."
    />
  ),
  hpa_subcellular_location: (
    <MultiListFilter
      name="hpa_subcellular_location"
      key="hpa_subcellular_location"
      list={subcellularLocationList}
      value={getFilter(filterBy, 'hpa_subcellular_location')}
      onChange={onChange}
      onRemove={onRemove}
      title="Subcellular location"
      description="Predicted location of the target in the cell."
    />
  ),
  has_safety_risk: (
    <BooleanFilter
      name="has_safety_risk"
      key="has_safety_risk"
      value={getFilter(filterBy, 'has_safety_risk')}
      onChange={onChange}
      onRemove={onRemove}
      title="Safety risk"
      description="Whether or not there is any safety risk information for the target."
      placeholder="Pick locations..."
    />
  ),
  safety_info_source: (
    <SafetySourceFilter
      name="safety_info_source"
      key="safety_info_source"
      value={getFilter(filterBy, 'safety_info_source')}
      onChange={onChange}
      onRemove={onRemove}
      title="Safety risk source"
      description="Source of the safety risk info."
    />
  ),
  safety_organs_systems_affected: (
    <StringFilter
      name="safety_organs_systems_affected"
      key="safety_organs_systems_affected"
      value={getFilter(filterBy, 'safety_organs_systems_affected')}
      onChange={onChange}
      onRemove={onRemove}
      title="Systems affected"
      description="List of organs where there are known safety risks for the target."
      placeholder="Safety risk affects..."
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
