import openDB from './open';
import populateDB from './populate';

import { createIndexes } from './indexes';
import { getDatasetRevision, setDatasetRevision } from '../utils';
import { storeUrl } from '../config';

// import dataset from '../data/dataset.json';

export async function getNewestDatasetRevision() {
  const res = await fetch(`${storeUrl}/current_revision.json`);
  const resJson = await res.json();
  const currentDatasetRevision = resJson.current_revision;
  const clientDatasetRevision = getDatasetRevision();

  console.log(`[DB] local dataset: [${clientDatasetRevision}]`);
  console.log(`[DB] current dataset: [${currentDatasetRevision}]`);

  const datasetUpToDate = currentDatasetRevision !== clientDatasetRevision;

  if (datasetUpToDate) {
    console.log('[DB] dataset is outdated');
  } else {
    console.log('[DB] dataset is up to date');
  }

  return datasetUpToDate ? currentDatasetRevision : null;
}

export async function updateClient(datasetRevision) {
  console.log(`[DB] updating dataset to revision ${datasetRevision}`);

  const db = openDB();

  // This does not work using async/await, the new DB has to be created in the
  // then of the the destroy. Otherwise nothing works properly in the DB after.
  await db.destroy().then(async () => {
    const newDB = openDB();

    const res = await fetch(`${storeUrl}/${datasetRevision}`);
    const resString = await res.text();
    const dataArray = resString.split('\n').map((line) => JSON.parse(line));
    const updateResult = await populateDB(newDB, dataArray);

    await createIndexes(openDB());

    console.log(`[DB] imported ${updateResult.length} rows`);

    setDatasetRevision(datasetRevision);
  });
}
