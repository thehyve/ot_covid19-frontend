import openDB from './open';

export const indexes = [
  ['FILTER_network'],
  ['FILTER_network+drug'],
  ['FILTER_network+covid_tests'],
  ['Implicated_in_viral_infection'],
  ['biotype'],
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
