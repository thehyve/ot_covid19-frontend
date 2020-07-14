import React from 'react';

import IntegerFilter from './IntegerFilter';
import MultiListFilter from './MultiListFilter';
import SafetySourceFilter from './SafetySourceFilter';
import StringFilter from './StringFilter';
import ToggleFilter from './ToggleFilter';

import NaLabel from '../Cells/NaLabel';
import { mapMaxPhase, specificTissueList } from '../../data/maps';
import { IconTrue, IconFalse, IconExists, IconWarning } from '../common';

import * as tooltips from '../../data/tooltips';

import { getFilter } from './utils';

import {
  biotypeList,
  subcellularLocationList,
  tissueDistributionList,
  tissueSpecificityList,
} from '../../data/maps';

const trueFalseOptions = [
  { label: <IconTrue />, tooltip: 'True', value: { $eq: true } },
  { label: <IconFalse />, tooltip: 'False', value: { $eq: false } },
];

const presentAbsentOptions = [
  { label: <IconExists />, tooltip: 'Values present', value: { $ne: null } },
  { label: <NaLabel />, tooltip: 'Values absent', value: { $eq: null } },
];

export const filters = (filterBy, onChange, onRemove) => ({
  biotype: (
    <MultiListFilter
      name="biotype"
      list={biotypeList}
      value={getFilter(filterBy, 'biotype')}
      onChange={onChange}
      onRemove={onRemove}
      title="Gene biotype"
    />
  ),
  'COVID-19 UniprotKB': (
    <ToggleFilter
      name="COVID-19 UniprotKB"
      value={getFilter(filterBy, 'COVID-19 UniprotKB')}
      onChange={onChange}
      onRemove={onRemove}
      options={trueFalseOptions}
      title="UniProt COVID-19"
      description={tooltips.uniprotCovidTooltip}
    />
  ),
  Covid_direct_interactions: (
    <ToggleFilter
      name="Covid_direct_interactions"
      value={getFilter(filterBy, 'Covid_direct_interactions')}
      onChange={onChange}
      onRemove={onRemove}
      options={presentAbsentOptions}
      title="Direct interactions"
      description="Target directly interacts with a viral protein."
    />
  ),
  Covid_indirect_interactions: (
    <ToggleFilter
      name="Covid_indirect_interactions"
      value={getFilter(filterBy, 'Covid_indirect_interactions')}
      onChange={onChange}
      onRemove={onRemove}
      options={presentAbsentOptions}
      title="Indirect interactions"
      description="Target interacts with one of the targets from the Direct column."
    />
  ),
  max_phase: (
    <ToggleFilter
      name="max_phase"
      value={getFilter(filterBy, 'max_phase')}
      integer
      onChange={onChange}
      onRemove={onRemove}
      options={[1, 2, 3, 4].map((val) => ({
        label: mapMaxPhase(val),
        tooltip: `Phase ${mapMaxPhase(val)}`,
        value: { $eq: val },
      }))}
      title="Max phase"
      description="Max clinical trial phase for any drug targeting this gene/protein for any indication."
    />
  ),
  drugs_in_clinic: (
    <IntegerFilter
      name="drugs_in_clinic"
      value={getFilter(filterBy, 'drugs_in_clinic')}
      onChange={onChange}
      onRemove={onRemove}
      title="Drugs in clinic"
      description="Number of drugs in clinical trials for a given target."
    />
  ),
  drugs_in_covid_trials: (
    <ToggleFilter
      name="drugs_in_covid_trials"
      value={getFilter(filterBy, 'drugs_in_covid_trials')}
      onChange={onChange}
      onRemove={onRemove}
      options={presentAbsentOptions}
      title="Drugs in COVID-19 CT"
      description="Whether or not there are drugs in clinical trials for COVID-19 whose mechanism of action is to modulate the given target."
    />
  ),
  invitro_covid_activity: (
    <StringFilter
      name="invitro_covid_activity"
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
      list={tissueSpecificityList}
      value={getFilter(filterBy, 'hpa_rna_tissue_specificity')}
      onChange={onChange}
      onRemove={onRemove}
      title="RNA tissue specificity"
      description="Expression specificity in different tissues."
    />
  ),
  hpa_rna_specific_tissues: (
    <MultiListFilter
      name="hpa_rna_specific_tissues"
      list={specificTissueList}
      value={getFilter(filterBy, 'hpa_rna_specific_tissues')}
      onChange={onChange}
      onRemove={onRemove}
      title="RNA specific tissues"
      description="List of tissues if target expression has some degree of specificity."
      placeholder="Specific to..."
    />
  ),
  hpa_subcellular_location: (
    <MultiListFilter
      name="hpa_subcellular_location"
      list={subcellularLocationList}
      value={getFilter(filterBy, 'hpa_subcellular_location')}
      onChange={onChange}
      onRemove={onRemove}
      title="Subcellular location"
      description="Predicted location of the target in the cell."
    />
  ),
  has_safety_risk: (
    <ToggleFilter
      name="has_safety_risk"
      value={getFilter(filterBy, 'has_safety_risk')}
      onChange={onChange}
      onRemove={onRemove}
      options={[
        {
          label: <IconWarning />,
          tooltip: 'Has safety risk',
          value: { $eq: true },
        },
        {
          label: <NaLabel />,
          tooltip: 'No safety risk',
          value: { $eq: false },
        },
      ]}
      title="Safety risk"
      description="Whether or not there is any safety risk information for the target."
    />
  ),
  safety_info_source: (
    <SafetySourceFilter
      name="safety_info_source"
      value={getFilter(filterBy, 'safety_info_source')}
      onChange={onChange}
      onRemove={onRemove}
      title="Safety risk source"
      description="Source of the safety risk info."
    />
  ),
});
