import openDB from './open';

async function fetchDB({ selector }) {
  const db = openDB();

  console.log(`[DB] find filters:`, selector);

  const result = await db.find({
    selector: { $and: selector },
  });

  return {
    rowCount: result.docs.length,
    rows: result.docs,
  };
}

export default fetchDB;
