import React from 'react';
import chroma from 'chroma-js';

import CellArray from '../components/Cells/CellArray';
import CellBoolean from '../components/Cells/CellBoolean';
import CellDescription from '../components/Cells/CellDescription';
import CellInvitro from '../components/Cells/CellInvitro';
import CellLink from '../components/Cells/CellLink';
import CellLiterature from '../components/Cells/CellLiterature';
import CellMaxPhase from '../components/Cells/CellMaxPhase';
import CellRegulation from '../components/Cells/CellRegulation';
import CellSafetyHas from '../components/Cells/CellSafetyHas';
import CellSafetySource from '../components/Cells/CellSafetySource';
import CellTractability from '../components/Cells/CellTractability';
import NaLabel from '../components/Cells/NaLabel';

import * as maps from './maps';
import * as tooltips from './tooltips';

import { comparatorFromAccessorLength, comparatorFromMaps } from '../utils';

const qualityScale = (len) =>
  chroma.scale(['#c6e3c7', '#ffffea', '#dcdcdc' /*'#fbc1af'*/]).colors(len);

export const qualityMidScale = (len) =>
  chroma.scale(['#ffffea', '#c6e3c7']).colors(len);

const columnGroups = (onClickCellContent) => [
  {
    label: 'Target Info',
    columns: [
      {
        id: 'scientificName',
        label: 'Species',
        tooltip: tooltips.speciesTooltip,
        minWidth: '5.125rem',
        sortable: true,
        renderCell: (row) => maps.mapScientificName(row.scientificName),
      },
      {
        id: 'ensembl_id',
        label: 'Ensembl ID',
        minWidth: '8.875rem',
        sortable: true,
        renderCell: (row) => (
          <CellLink prefix="ensembl" accession={row.ensembl_id} />
        ),
      },
      {
        id: 'name',
        label: 'Gene name',
        minWidth: '6rem',
        sortable: true,
        sticky: true,
      },
      {
        id: 'biotype',
        label: 'Gene biotype',
        filterable: true,
        defaultFilter: { $in: ['protein_coding'] },
        tooltip: tooltips.geneBiotypeTooltip,
        sortable: true,
      },
      {
        id: 'description',
        sortable: true,
        minWidth: '14.875rem',
        renderCell: (row) => <CellDescription description={row.description} />,
      },
      {
        id: 'uniprot_ids',
        label: 'UniProt IDs',
        minWidth: '6.3rem',
        sortable: true,
        comparator: (a, b) =>
          (a.uniprot_ids?.split(',').length ?? 0) -
          (b.uniprot_ids?.split(',').length ?? 0),
        renderCell: (row) => (
          <CellArray
            array={row.uniprot_ids?.split(',')}
            link={{ prefix: 'uniprot' }}
            onClickCellContent={onClickCellContent}
            contentTitle="UniProt IDs"
            contentDescription="UniProt protein IDs if the target is a protein coding gene"
          />
        ),
      },
      {
        id: 'COVID-19 UniprotKB',
        label: 'UniProt COVID-19',
        tooltip: tooltips.uniprotCovidTooltip,
        align: 'center',
        minWidth: '5.1rem',
        filterable: true,
        defaultFilter: { $eq: true },
        sortable: true,
        renderCell: (row) => (
          <CellBoolean value={row['COVID-19 UniprotKB']} fillNa={true} />
        ),
      },
      {
        id: 'covid_literature',
        label: 'COVID-19 Literature',
        tooltip: tooltips.covidLiteratureTooltip,
        align: 'center',
        minWidth: '5.1rem',
        sortable: true,
        renderCell: (row) => (
          <CellLiterature
            value={row.covid_literature}
            ensemblId={row.ensembl_id}
          />
        ),
      },
    ],
  },
  {
    label: 'Protein Interactions',
    columns: [
      {
        id: 'Covid_direct_interactions',
        label: 'Direct',
        tooltip: tooltips.directInteractionsTooltip,
        filterable: true,
        sortable: true,
        defaultFilter: { $ne: null },
        comparator: comparatorFromAccessorLength('Covid_direct_interactions'),
        renderCell: (row) => (
          <CellArray
            array={row.Covid_direct_interactions}
            link={{ prefix: 'intact' }}
            onClickCellContent={onClickCellContent}
            contentTitle="IntAct IDs"
            contentDescription="Target direct interaction with a viral protein"
          />
        ),
      },
      {
        id: 'Covid_indirect_interactions',
        label: 'Indirect',
        tooltip: tooltips.indirectInteractionsTooltip,
        filterable: true,
        sortable: true,
        defaultFilter: { $ne: null },
        comparator: comparatorFromAccessorLength('Covid_indirect_interactions'),
        renderCell: (row) => (
          <CellArray
            array={row.Covid_indirect_interactions}
            link={{ prefix: 'intact' }}
            onClickCellContent={onClickCellContent}
            contentTitle="IntAct IDs"
            contentDescription={
              <span>
                Target interaction with one of the targets from the{' '}
                <i>Direct</i> column
              </span>
            }
          />
        ),
      },
      {
        id: 'Implicated_in_viral_infection',
        label: 'Infection',
        tooltip: tooltips.implicatedInViralInfectionTooltip,
        // TODO: ask if I can fill NAS in this column
        align: 'center',
        sortable: true,
        renderCell: (row) => (
          <CellBoolean
            value={row['Implicated_in_viral_infection']}
            fillNa={true}
          />
        ),
      },
    ],
  },
  {
    label: 'Clinical data',
    columns: [
      {
        id: 'max_phase',
        tooltip: tooltips.maxPhaseTooltip,
        align: 'center',
        minWidth: '6rem',
        filterable: true,
        sortable: true,
        defaultFilter: { $eq: 4 },
        renderCell: (row) => <CellMaxPhase value={row.max_phase} />,
      },
      {
        id: 'drugs_in_clinic',
        align: 'center',
        label: 'Drugs',
        tooltip: tooltips.drugsInClinicTooltip,
        filterable: true,
        sortable: true,
        defaultFilter: { $gte: 1 },
        renderCell: (row) => parseInt(row.drugs_in_clinic ?? 0),
      },
      {
        id: 'drugs_in_covid_trials',
        label: 'COVID-19 drugs',
        minWidth: '8.4375rem',
        tooltip: tooltips.drugsInCovidTrialsTooltip,
        filterable: true,
        sortable: true,
        defaultFilter: { $ne: null },
        comparator: comparatorFromAccessorLength('drugs_in_covid_trials', ';'),
        renderCell: (row) => (
          <CellArray
            array={row.drugs_in_covid_trials?.split(';')}
            link={{
              url: 'https://alpha.targetvalidation.org/search?q=$$&page=1',
            }}
            onClickCellContent={onClickCellContent}
            contentTitle="Drugs In COVID-19 trials"
            contentDescription="List of drugs whose mechanism of action is to modulate the given targets in clinical trials for COVID-19"
          />
        ),
      },
    ],
  },
  {
    label: 'COVID-19 Bioassays',
    columns: [
      {
        id: 'has_invitro_covid_activity',
        label: 'Bioactivity',
        minWidth: '6rem',
        align: 'center',
        tooltip: tooltips.hasInvitroCovidActivityTooltip,
        sortable: true,
        comparator: (a, b) => {
          const getNumDen = (d) =>
            d.has_invitro_covid_activity
              ? d.has_invitro_covid_activity?.split('/').map((n) => parseInt(n))
              : [0, 0];

          const [aNum, aDen] = getNumDen(a);
          const [bNum, bDen] = getNumDen(b);

          return aNum || bNum ? aNum - bNum : aDen - bDen;
        },
        renderCell: (row) => row.has_invitro_covid_activity ?? <>0/0</>,
      },
      {
        id: 'invitro_covid_activity',
        label: 'Compounds',
        tooltip: tooltips.invitroCovidActivityTooltip,
        filterable: true,
        sortable: true,
        defaultFilter: { $regex: 'HYDROXYCHLOROQUINE' },
        comparator: comparatorFromAccessorLength('invitro_covid_activity', ';'),
        renderCell: (row) => (
          <CellInvitro
            entries={row.invitro_covid_activity}
            link={{
              url: 'https://alpha.targetvalidation.org/search?q=$$&page=1',
            }}
            onClickCellContent={onClickCellContent}
            contentTitle="In-vitro COVID-19 compound list"
            contentDescription="Compounds modulating given target that have been tested in in-vitro assays and whether they were active or not."
          />
        ),
      },
    ],
  },
  {
    label: 'Baseline gene expression',
    columns: [
      {
        id: 'hpa_subcellular_location',
        label: 'Subcellular location',
        tooltip: tooltips.subcellularLocationTooltip,
        filterable: true,
        sortable: true,
        defaultFilter: { $in: ['Plasma membrane'] },
        comparator: comparatorFromAccessorLength('hpa_subcellular_location'),
        renderCell: (row) => (
          <CellArray
            array={row.hpa_subcellular_location}
            link={{
              url: 'https://www.proteinatlas.org/search/subcell_location:$$',
            }}
            onClickCellContent={onClickCellContent}
            contentTitle="Subcellular location"
            contentDescription="Predicted location of the target in the cell"
          />
        ),
      },
      {
        id: 'hpa_rna_tissue_distribution',
        label: 'RNA tissue distribution',
        tooltip: tooltips.rnaTissueDistributionTooltip,
        filterable: true,
        defaultFilter: { $in: ['Detected in single'] },
        sortable: true,
        comparator: comparatorFromMaps(
          'hpa_rna_tissue_distribution',
          maps.mapTissueDistribution
        ),
        renderCell: (row) => row.hpa_rna_tissue_distribution || <NaLabel />,
      },
      {
        id: 'hpa_rna_tissue_specificity',
        label: 'RNA tissue specificity',
        tooltip: tooltips.rnaTissueSpecifityTooltip,
        filterable: true,
        defaultFilter: { $in: ['Tissue enriched'] },
        sortable: true,
        renderCell: (row) => row.hpa_rna_tissue_specificity || <NaLabel />,
      },
      {
        id: 'hpa_rna_specific_tissues',
        label: 'RNA specific tissues',
        tooltip: tooltips.rnaSpecificTissuesTooltip,
        minWidth: '7rem',
        filterable: true,
        sortable: true,
        defaultFilter: { $in: ['lung'] },
        comparator: comparatorFromAccessorLength('hpa_rna_specific_tissues'),
        renderCell: (row) => {
          const urlPart =
            'https://www.proteinatlas.org/search/tissue_category_rna';
          const specPart = row.hpa_rna_tissue_specificity?.replace(/ /g, '+');

          return (
            <CellArray
              array={row.hpa_rna_specific_tissues}
              link={{ url: `${urlPart}:$$;${specPart}` }}
              onClickCellContent={onClickCellContent}
              contentTitle="RNA Specific tissues"
              contentDescription="List of tissues if target expression has some degree of specificity"
            />
          );
        },
      },
    ],
  },
  {
    label: 'Host proteins',
    columns: [
      {
        id: 'abundance_reg_on_covid',
        label: 'Regulated',
        tooltip: tooltips.abundanceRegOnCovidTooltip,
        minWidth: '8.1rem',
        sortable: true,
        comparator: comparatorFromAccessorLength('abundance_reg_on_covid'),
        renderCell: (row) => (
          <CellRegulation value={row.abundance_reg_on_covid} />
        ),
      },
    ],
  },
  {
    label: 'Baseline gene expression',
    columns: [
      {
        id: 'respiratory_system_expressed_tissue_list',
        label: 'Respiratory system tissues',
        tooltip: tooltips.respiratorySystemTissuesTooltip,
        minWidth: '8rem',
        sortable: true,
        comparator: comparatorFromAccessorLength(
          'respiratory_system_expressed_tissue_list'
        ),
        renderCell: (row) => (
          <CellArray
            array={row.respiratory_system_expressed_tissue_list}
            link={{
              url:
                'https://www.ebi.ac.uk/gxa/search?conditionQuery=[{value:$$}]',
            }}
            onClickCellContent={onClickCellContent}
            contentTitle="Respiratory system expressed tissues"
            contentDescription="List of tissues from the respiratory system where the target is expressed"
          />
        ),
      },
      {
        id: 'immune_system_expressed_tissue_list',
        label: 'Immune system tissues',
        tooltip: tooltips.immuneSystemTissuesTooltip,
        minWidth: '8rem',
        sortable: true,
        comparator: comparatorFromAccessorLength(
          'immune_system_expressed_tissue_list'
        ),
        renderCell: (row) => (
          <CellArray
            array={row.immune_system_expressed_tissue_list}
            link={{
              url:
                'https://www.ebi.ac.uk/gxa/search?conditionQuery=[{value:$$}]',
            }}
            onClickCellContent={onClickCellContent}
            contentTitle="Immune system expressed tissues"
            contentDescription="List of tissues from the immune system where the target is expressed"
          />
        ),
      },
    ],
  },
  {
    label: 'Target tractability',
    columns: [
      {
        id: 'Tractability_Top_bucket_(sm)',
        label: 'Small molecule',
        tooltip: tooltips.tractabilityBucketSMTooltip,
        align: 'center',
        sortable: true,
        comparator: comparatorFromMaps(
          'Tractability_Top_bucket_(sm)',
          maps.mapTractabilityTopBucketSM,
          { ascending: true }
        ),
        renderCell: (row) => (
          <CellTractability
            buckets={maps.tractabilityTopBucketSMCaptions}
            selectedBucket={maps.mapTractabilityTopBucketSM(
              row['Tractability_Top_bucket_(sm)']
            )}
            colorScale={qualityScale(
              maps.tractabilityTopBucketSMCaptions.length
            )}
            onClickCellContent={onClickCellContent}
            contentTitle="Tractability top bucket (small molecule)"
            contentDescription="small molecule"
          />
        ),
      },
      {
        id: 'Tractability_Top_bucket_(ab)',
        label: 'Antibody',
        tooltip: tooltips.tractabilityBucketABTooltip,
        align: 'center',
        sortable: true,
        comparator: comparatorFromMaps(
          'Tractability_Top_bucket_(ab)',
          maps.mapTractabilityTopBucketAB,
          { ascending: true }
        ),
        renderCell: (row) => (
          <CellTractability
            buckets={maps.tractabilityTopBucketABCaptions}
            selectedBucket={maps.mapTractabilityTopBucketAB(
              row['Tractability_Top_bucket_(ab)']
            )}
            colorScale={qualityScale(
              maps.tractabilityTopBucketABCaptions.length
            )}
            onClickCellContent={onClickCellContent}
            contentTitle="Tractability top bucket (antibody)"
            contentDescription="antibody"
          />
        ),
      },
      {
        id: 'Tractability_Top_bucket_(other)',
        label: 'Other modalities',
        tooltip: tooltips.tractabilityBucketOtherTooltip,
        align: 'center',
        sortable: true,
        comparator: comparatorFromMaps(
          'Tractability_Top_bucket_(other)',
          maps.mapTractabilityTopBucketOther,
          { ascending: true }
        ),
        renderCell: (row) => (
          <CellTractability
            buckets={maps.tractabilityTopBucketOtherCaptions}
            selectedBucket={maps.mapTractabilityTopBucketOther(
              row['Tractability_Top_bucket_(other)']
            )}
            colorScale={qualityScale(
              maps.tractabilityTopBucketOtherCaptions.length
            )}
            onClickCellContent={onClickCellContent}
            contentTitle="Tractability top bucket (other)"
            contentDescription="other modalities"
          />
        ),
      },
    ],
  },
  {
    label: 'Target safety',
    columns: [
      {
        id: 'has_safety_risk',
        label: 'Safety risk',
        tooltip: tooltips.hasSafetyRiskTooltip,
        align: 'center',
        filterable: true,
        sortable: true,
        defaultFilter: { $eq: false },
        renderCell: (row) => <CellSafetyHas value={row.has_safety_risk} />,
      },
      {
        id: 'safety_info_source',
        label: 'Source',
        tooltip: tooltips.safetyInfoSourceTooltip,
        filterable: true,
        sortable: true,
        defaultFilter: { $all: ['experimental_toxicity'] },
        comparator: comparatorFromAccessorLength('safety_info_source'),
        renderCell: (row) => (
          <CellSafetySource
            value={row.safety_info_source}
            accession={row.ensembl_id}
          />
        ),
      },
      {
        id: 'safety_organs_systems_affected',
        label: 'Systems affected',
        tooltip: tooltips.safetyOrgansSystemsAffectedTooltip,
        sortable: true,
        comparator: comparatorFromAccessorLength(
          'safety_organs_systems_affected'
        ),
        renderCell: (row) => (
          <CellArray
            array={row.safety_organs_systems_affected}
            link={{
              url: `https://alpha.targetvalidation.org/target/${row.ensembl_id}`,
            }}
            onClickCellContent={onClickCellContent}
            contentTitle="Organ systems affected"
            contentDescription="List of organs where there are known safety risks for the target"
          />
        ),
      },
    ],
  },
];

export const columns = (setContent) => {
  const preparedColumnGroups = columnGroups(setContent);

  return Object.keys(preparedColumnGroups)
    .map((group) => preparedColumnGroups[group].columns)
    .flat();
};

export const headerGroups = columnGroups().map((group) => ({
  label: group.label,
  colspan: group.columns.length,
}));
