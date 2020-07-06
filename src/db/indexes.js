import openDB from './open';

export const indexes = [
  ['COVID-19 UniprotKB'],
  ['Covid_direct_interactions'],
  ['Covid_indirect_interactions'],
  ['max_phase'],
  ['hpa_subcellular_location'],
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
