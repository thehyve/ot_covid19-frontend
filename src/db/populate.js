// TODO: This has to streamed.
function populateDB(db, dataset) {
  console.log(`[DB] importing ${dataset.length} rows`);
  return db.bulkDocs(dataset);
}

export default populateDB;
