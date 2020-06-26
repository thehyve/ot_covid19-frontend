import _ from 'lodash';

import { naLabel, splitStringInParentheses } from '../utils';

export const mapScientificName = (str) =>
  ({
    'Homo sapiens': 'Human',
    'Severe acute respiratory syndrome-related coronavirus': 'CoV-SARS-1',
    'Severe acute respiratory syndrome coronavirus 2': 'CoV-SARS-2',
    [naLabel]: naLabel,
  }[str?.trim() || naLabel]);

export const mapTissueDistribution = (str) =>
  ({
    'Not detected': 0,
    'Detected in single': 10,
    'Detected in some': 20,
    'Detected in many': 30,
    'Detected in all': 40,
    [naLabel]: naLabel,
  }[str?.trim() || naLabel]);

export const mapTractabilityTopBucketSM = (str) =>
  ({
    'Targets with drugs in phase IV': 1,
    'Targets with drugs in phase II or phase III': 2,
    'Targets with drugs in phase 0 or phase I': 3,
    'Targets with crystal structures with ligands': 4,
    'Targets with a drugEBIlity score equal or greater than 0.7': 5,
    'Targets with drugEBIlity between 0 and 0.7': 6,
    'Targets with ligands': 7,
    'Targets with a predicted Ro5 druggable domain (druggable genome)': 8,
    [naLabel]: naLabel,
  }[str?.trim() || naLabel]);

// TODO: THIS IS NOT CORRECTLY SORTED https://docs.targetvalidation.org/getting-started/target-tractability
export const mapTractabilityTopBucketAB = (str) =>
  ({
    'Targets with drugs in phase IV': 1,
    'Targets with drugs in phase II or phase III': 2,
    'Targets with drugs in phase 0 or phase I': 3,
    'Targets located in the plasma membrane': 4,
    'Targets with GO cell component terms plasma membrane or secreted': 5,
    'Targets with predicted signal peptide and transmembrane domains': 6,
    'GO cell component - medium confidence': 7,
    'Targets with GO cell component terms plasma membrane or secreted with low or unknown confidence': 8,
    'Human Protein Atlas - high confidence': 9,
    [naLabel]: naLabel,
  }[str?.trim() || naLabel]);

export const mapTractabilityTopBucketOther = (str) =>
  ({
    'Targets with drugs in phase IV': 1,
    'Targets with drugs in phase II or phase III': 2,
    'Targets with drugs in phase 0 or phase I': 3,
    [naLabel]: naLabel,
  }[str?.trim() || naLabel]);

export const mapSource = (sourceName, sourceAccession) =>
  ({
    'HGNC Symbol': `https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/${
      sourceAccession.split(':')[1]
    }`,
    miRBase: `http://www.mirbase.org/cgi-bin/mirna_entry.pl?acc=${sourceAccession}`,
    'NCBI gene': `https://www.ncbi.nlm.nih.gov/gene/${sourceAccession}`,
    'UniprotKB/Swiss-Prot': `http://purl.uniprot.org/uniprot/${sourceAccession}`,
  }[sourceName]);

const invitroCovidActivityMap = [
  'highly active',
  'highly active and cytotoxic',
  'weakly active',
  'weakly active and cytotoxic',
  'inactive',
];

const mapInvitroCovidActivity = (str) => {
  let activityLevel;

  invitroCovidActivityMap.forEach((level) => {
    if (str.includes(level)) activityLevel = level;
  });

  return activityLevel;
};

const stripEntryGroups = (entryGroups) => {
  const strippedEntryGroups = {};

  invitroCovidActivityMap.forEach((group) => {
    strippedEntryGroups[group] = entryGroups[group]?.map((entry) => {
      const [compound, method] = splitStringInParentheses(entry);
      const strippedCompound = compound
        .replace(/highly|active|and|cytotoxic|weakly|inactive/g, '')
        .trim();

      return {
        compound: strippedCompound,
        method,
      };
    });
  });

  return strippedEntryGroups;
};

export const prepareInvitroCovidActivity = (row) => {
  if (!row) return null;

  const entries = row.split(';');
  const entryGroups = _.groupBy(entries, mapInvitroCovidActivity);
  return stripEntryGroups(entryGroups);
};

export const biotypeList = [
  'lncRNA',
  'unprocessed_pseudogene',
  'protein_coding',
  'processed_pseudogene',
  'snRNA',
  'misc_RNA',
  'transcribed_unitary_pseudogene',
  'miRNA',
  'snoRNA',
  'rRNA_pseudogene',
  'transcribed_unprocessed_pseudogene',
  'TR_J_gene',
  'TEC',
  'IG_V_gene',
  'LRG_gene',
  'IG_V_pseudogene',
  'transcribed_processed_pseudogene',
  'translated_processed_pseudogene',
  'scaRNA',
  'IG_J_gene',
  'TR_V_gene',
  'polymorphic_pseudogene',
  'IG_J_pseudogene',
  'unitary_pseudogene',
  'rRNA',
  'TR_V_pseudogene',
  'IG_D_gene',
  'TR_D_gene',
  'pseudogene',
  'IG_C_pseudogene',
  'Mt_tRNA',
  'IG_C_gene',
  'scRNA',
  'TR_J_pseudogene',
  'ribozyme',
  'TR_C_gene',
  'sRNA',
  'translated_unprocessed_pseudogene',
  'IG_pseudogene',
  'vaultRNA',
  'Mt_rRNA',
];
