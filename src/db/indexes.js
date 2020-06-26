export async function createIndexes(db) {
  console.log('[DB] creating indexes');

  db.createIndex({
    index: {
      fields: ['FILTER_network'],
    },
  });

  db.createIndex({
    index: {
      fields: ['FILTER_network+drug'],
    },
  });

  db.createIndex({
    index: {
      fields: ['FILTER_network+covid_tests'],
    },
  });

  db.createIndex({
    index: {
      fields: ['Implicated_in_viral_infection'],
    },
  });

  db.createIndex({
    index: {
      fields: ['biotype'],
    },
  });
}
