import React from 'react';
import { Link } from '@material-ui/core';
import chroma from 'chroma-js';

import {
  mapScientificName,
  mapTissueDistribution,
  mapTractabilityTopBucketSM,
  mapTractabilityTopBucketAB,
  mapTractabilityTopBucketOther,
  prepareInvitroCovidActivity,
  tractabilityTopBucketSMDescription,
  tractabilityTopBucketABDescription,
  tractabilityTopBucketOtherDescription,
} from './maps';
import {
  renderArray,
  renderBoolean,
  renderBooleanFillNa,
  renderDescription,
  renderSafetyHas,
  renderSafetySource,
  renderLink,
  renderInvitroArrays,
  renderTractabilityTopBucket,
} from './renderers';
import {
  comparatorFromAccessorLength,
  comparatorFromMaps,
  naLabel,
} from '../utils';

const qualityScale = chroma
  .scale(['#c6e3c7', '#ffffea', '#fbc1af'])
  .colors(tractabilityTopBucketABDescription.length);

const columnGroups = (onClickCellContent) => [
  {
    label: 'Target Info',
    columns: [
      {
        id: 'scientificName',
        label: 'Species',
        sortable: true,
        renderCell: (row) => mapScientificName(row.scientificName),
      },
      {
        id: 'ensembl_id',
        label: 'Ensembl ID',
        sortable: true,
        renderCell: (row) =>
          renderLink({ prefix: 'ensembl', accession: row.ensembl_id }),
      },
      {
        id: 'name',
        label: 'Gene name',
        sortable: true,
        sticky: true,
      },
      {
        id: 'biotype',
        label: 'Gene biotype',
        sortable: true,
      },
      {
        id: 'description',
        sortable: true,
        renderCell: (row) => renderDescription(row.description),
      },
      {
        id: 'uniprot_ids',
        label: 'UniProt IDs',
        minWidth: '7.5rem',
        sortable: true,
        comparator: (a, b) =>
          (a.uniprot_ids?.split(',').length ?? 0) -
          (b.uniprot_ids?.split(',').length ?? 0),
        renderCell: (row) =>
          renderArray(
            row.uniprot_ids?.split(','),
            { prefix: 'uniprot' },
            onClickCellContent,
            'UniProt IDs',
            'UniProt protein IDs if the target is a protein coding gene'
          ),
      },
      {
        id: 'COVID-19 UniprotKB',
        label: 'UniProt COVID-19',
        tooltip: (
          <>
            <span>
              Whether or not the target was included in the{' '}
              <Link color="secondary" href="https://covid-19.uniprot.org">
                COVID-19 Uniprot website
              </Link>
              .
            </span>
          </>
        ),
        align: 'center',
        minWidth: '7.5rem',
        sortable: true,
        renderCell: (row) => renderBoolean(row['COVID-19 UniprotKB']),
      },
    ],
  },
  // {
  //   label: 'Filters',
  //   columns: [
  //     {
  //       id: 'FILTER_network',
  //       label: '1',
  //       align: 'center',
  //       sortable: true,
  //       renderCell: (row) => renderBoolean(row.FILTER_network),
  //     },
  //     {
  //       id: 'FILTER_network+drug',
  //       label: '2',
  //       align: 'center',
  //       sortable: true,
  //       renderCell: (row) => renderBoolean(row['FILTER_network+drug']),
  //     },
  //     {
  //       id: 'FILTER_network+covid_tests',
  //       label: '3',
  //       align: 'center',
  //       sortable: true,
  //       renderCell: (row) => renderBoolean(row['FILTER_network+covid_tests']),
  //     },
  //   ],
  // },
  {
    label: 'Protein Interactions',
    columns: [
      {
        id: 'Covid_direct_interactions',
        label: 'Direct',
        tooltip: (
          <>
            <span>
              <strong>Direct interaction: </strong>Target directly interacts
              with a viral protein.
            </span>
          </>
        ),
        sortable: true,
        comparator: comparatorFromAccessorLength('Covid_direct_interactions'),
        renderCell: (row) =>
          renderArray(
            row.Covid_direct_interactions,
            { prefix: 'intact' },
            onClickCellContent,
            'IntAct IDs',
            'Target direct interaction with a viral protein'
          ),
      },
      {
        id: 'Covid_indirect_interactions',
        label: 'Indirect',
        tooltip: (
          <>
            <span>
              <strong>Indirect interaction: </strong>Target interacts with one
              of the targets from the <i>Direct</i> column.
            </span>
          </>
        ),
        sortable: true,
        comparator: comparatorFromAccessorLength('Covid_indirect_interactions'),
        renderCell: (row) =>
          renderArray(
            row.Covid_indirect_interactions,
            { prefix: 'intact' },
            onClickCellContent,
            'IntAct IDs',
            <span>
              Target interaction with one of the targets from the <i>Direct</i>{' '}
              column
            </span>
          ),
      },
      {
        id: 'Implicated_in_viral_infection',
        label: 'Infection',
        tooltip: (
          <>
            <span>
              <strong>Implicated in viral infection: </strong>Target does not
              interact with a CoV-SARS-X protein but interacts with another
              virus.
            </span>
          </>
        ),
        // TODO: ask if I can fill NAS in this column
        align: 'center',
        sortable: true,
        renderCell: (row) =>
          renderBooleanFillNa(row['Implicated_in_viral_infection']),
      },
    ],
  },
  {
    label: 'Drugs and compounds for target',
    columns: [
      {
        id: 'max_phase',
        align: 'center',
        sortable: true,
        renderCell: (row) =>
          row.max_phase ? parseInt(row.max_phase) : <>{naLabel}</>,
      },
      {
        id: 'drugs_in_clinic',
        align: 'center',
        label: 'Drugs in CT',
        tooltip: (
          <>
            <span>
              <strong>Drugs in Clinical Trial: </strong>Total number of drugs in
              clinical trials for a given target.
            </span>
          </>
        ),
        sortable: true,
        renderCell: (row) => parseInt(row.drugs_in_clinic ?? 0),
      },
      {
        // FILTER
        id: 'has_drug_in_covid_trials',
        label: 'COVID-19 CT',
        align: 'center',
        minWidth: '8rem',
        sortable: true,
        // TODO: ask if I can fill NAS in this column
        renderCell: (row) => renderBooleanFillNa(row.has_drug_in_covid_trials),
      },
      {
        id: 'drugs_in_covid_trials',
        label: 'Drugs',
        tooltip: (
          <>
            <span>
              <strong>Drugs in COVID-19 Clinical Trials: </strong>List of drugs
              whose mechanism of action is to modulate the given targets in
              clinical trials for COVID-19.
            </span>
          </>
        ),
        sortable: true,
        comparator: comparatorFromAccessorLength('drugs_in_covid_trials', ';'),
        renderCell: (row) =>
          renderArray(
            row.drugs_in_covid_trials?.split(';'),
            { url: 'https://alpha.targetvalidation.org/search?q=$$&page=1' },
            onClickCellContent,
            'Drugs In COVID-19 trials',
            'List of drugs whose mechanism of action is to modulate the given targets in clinical trials for COVID-19'
          ),
      },
      {
        id: 'has_invitro_covid_activity',
        label: 'In-vitro',
        minWidth: '6rem',
        align: 'center',
        tooltip: (
          <>
            <span>
              <strong>In-vitro COVID-19 activity: </strong>Rate of assays where
              the compounds modulating given target have been active against
              COVID-19 compared to all assays that have tested compounds
              modulating it.
            </span>
          </>
        ),
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
        tooltip: (
          <>
            <span>
              <strong>In-vitro COVID-19 compound list: </strong>Compounds
              modulating given target that have been tested in in-vitro assays
              and whether they were active or not.
            </span>
          </>
        ),
        sortable: true,
        comparator: comparatorFromAccessorLength('invitro_covid_activity', ';'),
        renderCell: (row) => {
          const entries = row.invitro_covid_activity;

          return renderInvitroArrays(
            prepareInvitroCovidActivity(entries),
            { url: 'https://alpha.targetvalidation.org/search?q=$$&page=1' },
            onClickCellContent,
            'In-vitro COVID-19 compound list',
            'Compounds modulating given target that have been tested in in-vitro assays and whether they were active or not.',
            entries?.split(';').length
          );
        },
      },
    ],
  },
  {
    label: 'Baseline gene expression (HPA)',
    columns: [
      {
        id: 'hpa_subcellular_location',
        label: 'Subcellular location',
        sortable: true,
        comparator: comparatorFromAccessorLength('hpa_subcellular_location'),
        renderCell: (row) =>
          renderArray(
            row.hpa_subcellular_location,
            { url: 'https://www.proteinatlas.org/search/subcell_location:$$' },
            onClickCellContent,
            'Subcellular location',
            'Predicted location of the target in the cell'
          ),
      },
      {
        id: 'hpa_rna_tissue_distribution',
        label: 'RNA tissue distribution',
        sortable: true,
        comparator: comparatorFromMaps(
          'hpa_rna_tissue_distribution',
          mapTissueDistribution
        ),
        renderCell: (row) => row.hpa_rna_tissue_distribution || naLabel,
      },
      {
        id: 'hpa_rna_tissue_specificity',
        label: 'RNA tissue specificity',
        sortable: true,
        renderCell: (row) => row.hpa_rna_tissue_specificity || naLabel,
      },
      {
        id: 'hpa_rna_specific_tissues',
        label: 'RNA specific tissues',
        sortable: true,
        comparator: comparatorFromAccessorLength('hpa_rna_specific_tissues'),
        renderCell: (row) =>
          renderArray(
            row.hpa_rna_specific_tissues,
            {
              // TODO: Fix this links: https://www.proteinatlas.org/search/tissue_category_rna:Adipose+tissue;Tissue+enhanced
              url: 'https://www.proteinatlas.org/search/tissue_category_rna:$$',
            },
            onClickCellContent,
            'RNA Specific tissues',
            'List of tissues if target expression has some degree of specificity'
          ),
      },
    ],
  },
  {
    label: 'Baseline gene expression (EA)',
    columns: [
      {
        id: 'respiratory_system_is_expressed',
        label: 'Expressed in respiratory system',
        align: 'center',
        minWidth: '8rem',
        sortable: true,
        // TODO: ask if I can fill NAS in this column
        renderCell: (row) =>
          renderBooleanFillNa(row.respiratory_system_is_expressed),
      },
      {
        id: 'respiratory_system_expressed_tissue_list',
        label: 'Respiratory system tissue list',
        sortable: true,
        comparator: comparatorFromAccessorLength(
          'respiratory_system_expressed_tissue_list'
        ),
        renderCell: (row) =>
          renderArray(
            row.respiratory_system_expressed_tissue_list,
            {
              url:
                'https://www.ebi.ac.uk/gxa/search?conditionQuery=[{value:$$}]',
            },
            onClickCellContent,
            'Respiratory system expressed tissues',
            'List of tissues from the respiratory system where the target is expressed'
          ),
      },
      {
        id: 'immune_system_is_expressed',
        label: 'Expressed in immune system',
        align: 'center',
        sortable: true,
        // TODO: ask if I can fill NAS in this column
        renderCell: (row) =>
          renderBooleanFillNa(row.immune_system_is_expressed),
      },
      {
        id: 'immune_system_expressed_tissue_list',
        label: 'Immune system tissue list',
        minWidth: '8rem',
        sortable: true,
        comparator: comparatorFromAccessorLength(
          'immune_system_expressed_tissue_list'
        ),
        renderCell: (row) =>
          renderArray(
            row.immune_system_expressed_tissue_list,
            {
              url:
                'https://www.ebi.ac.uk/gxa/search?conditionQuery=[{value:$$}]',
            },
            onClickCellContent,
            'Immune system expressed tissues',
            'List of tissues from the immune system where the target is expressed'
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
        align: 'center',
        sortable: true,
        comparator: comparatorFromMaps(
          'Tractability_Top_bucket_(sm)',
          mapTractabilityTopBucketSM,
          { ascending: true }
        ),
        renderCell: (row) =>
          renderTractabilityTopBucket(
            tractabilityTopBucketSMDescription,
            qualityScale,
            onClickCellContent,
            mapTractabilityTopBucketSM(row['Tractability_Top_bucket_(sm)']),
            'Tractability top bucket (small molecule)',
            <span>
              Name of the highest <strong>small molecule</strong> tractability
              bucket. More information about{' '}
              <Link
                href="https://docs.targetvalidation.org/getting-started/target-tractability"
                target="blank"
              >
                target tractability
              </Link>
              .
            </span>
          ),
      },
      {
        id: 'Tractability_Top_bucket_(ab)',
        label: 'Antibody',
        align: 'center',
        sortable: true,
        comparator: comparatorFromMaps(
          'Tractability_Top_bucket_(ab)',
          mapTractabilityTopBucketAB,
          { ascending: true }
        ),
        renderCell: (row) =>
          renderTractabilityTopBucket(
            tractabilityTopBucketABDescription,
            qualityScale,
            onClickCellContent,
            mapTractabilityTopBucketAB(row['Tractability_Top_bucket_(ab)']),
            'Tractability top bucket (antibody)',
            <span>
              Name of the highest <strong>antibody</strong> tractability bucket.
              More information about{' '}
              <Link
                href="https://docs.targetvalidation.org/getting-started/target-tractability"
                target="blank"
              >
                target tractability
              </Link>
              .
            </span>
          ),
      },
      {
        id: 'Tractability_Top_bucket_(other)',
        label: 'Other modalities',
        align: 'center',
        sortable: true,
        comparator: comparatorFromMaps(
          'Tractability_Top_bucket_(other)',
          mapTractabilityTopBucketOther,
          { ascending: true }
        ),
        renderCell: (row) =>
          renderTractabilityTopBucket(
            tractabilityTopBucketOtherDescription,
            qualityScale,
            onClickCellContent,
            mapTractabilityTopBucketOther(
              row['Tractability_Top_bucket_(other)']
            ),
            'Tractability top bucket (other)',
            <span>
              Name of the highest tractability bucket for{' '}
              <strong>other modalities</strong>. More information about{' '}
              <Link
                href="https://docs.targetvalidation.org/getting-started/target-tractability"
                target="blank"
              >
                target tractability
              </Link>
              .
            </span>
          ),
      },
    ],
  },
  {
    label: 'Target safety',
    columns: [
      {
        id: 'has_safety_risk',
        align: 'center',
        sortable: true,
        // TODO: ask if I can fill NAS in this column
        renderCell: (row) => renderSafetyHas(row.has_safety_risk),
      },
      {
        id: 'safety_info_source',
        label: 'Source',
        sortable: true,
        comparator: comparatorFromAccessorLength('safety_info_source'),
        renderCell: (row) =>
          renderSafetySource(row.safety_info_source, row.ensembl_id),
      },
      {
        id: 'safety_organs_systems_affected',
        label: 'Systems affected',
        sortable: true,
        comparator: comparatorFromAccessorLength(
          'safety_organs_systems_affected'
        ),
        renderCell: (row) =>
          renderArray(
            row.safety_organs_systems_affected,
            {
              url: `https://alpha.targetvalidation.org/target/${row.ensembl_id}`,
            },
            onClickCellContent,
            'Organ systems affected',
            'List of organs where there are known safety risks for the target'
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
