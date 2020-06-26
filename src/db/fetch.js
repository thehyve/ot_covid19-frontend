import openDB from './open';

// TODO: filters go here
async function fetchDB({ startkey, limit, selector }) {
  const db = openDB();
  const options = { include_docs: true };
  let result;

  if (startkey) options.startkey = startkey;
  if (limit) options.limit = limit;

  if (!Object.keys(selector).length) {
    result = await db.allDocs(options);
    console.log(`[DB] fetching allDocs (limit: ${limit})`);

    return {
      rowCount: result.total_rows,
      rows: result.rows.map((row) => row.doc),
    };
  } else {
    console.log(`[DB] find filters:`, selector);
    result = await db.find({
      selector: { $and: selector },
    });

    return {
      rowCount: result.docs.length,
      rows: result.docs,
    };
  }
}

export default fetchDB;
