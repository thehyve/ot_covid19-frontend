import openDB from './open';

export const indexes = [
  ['biotype'],
  ['COVID-19 UniprotKB'],
  ['Covid_direct_interactions'],
  ['Covid_indirect_interactions'],
  ['max_phase'],
  ['drugs_in_clinic'],
  ['invitro_covid_activity'],
  ['hpa_rna_tissue_distribution'],
  ['hpa_rna_tissue_specificity'],
  ['hpa_rna_specific_tissues'],
  ['has_drug_in_covid_trials'],
  ['hpa_subcellular_location'],
  ['has_safety_risk'],
  ['safety_organs_systems_affected'],
];

export const createIndex = async (fields) => {
  const db = openDB();

  const result = await db.createIndex({
    index: {
      fields: fields,
    },
  });

  console.log(`[DB] created index on ${fields}: ${result.result}`);

  return result;
};
