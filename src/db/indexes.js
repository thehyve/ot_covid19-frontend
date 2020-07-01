import openDB from './open';

const createIndex = async (db, fields) => {
  const result = await db.createIndex({
    index: {
      fields: fields,
    },
  });

  console.log(`[DB] created index on ${fields}: ${result.result}`);

  return result;
};

export async function createIndexes() {
  const db = openDB();
  console.log('[DB] creating indexes');

  await createIndex(db, ['FILTER_network']);
  await createIndex(db, ['FILTER_network+drug']);
  await createIndex(db, ['FILTER_network+covid_tests']);
  await createIndex(db, ['Implicated_in_viral_infection']);
  await createIndex(db, ['biotype']);

  console.log('[DB] indexes created');
}
