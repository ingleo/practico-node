const db = {
  user: [{ id: "1", name: "leonardo" }],
};

const list = async (table) => {
  return db[table] || [];
};

const get = async (table, id) => {
  let collection = await list(table);
  return collection.filter((item) => item.id === id)[0] || null;
};

const upsert = async (table, data) => {
  if (!db[table]) {
    db[table] = [];
  }
  db[table].push(data);
  console.log(db);
};

const remove = async (table, id) => {
  return true;
};

const query = async (table, q) => {
  let collection = await list(table);
  console.log(collection);
  let keys = Object.keys(q);
  console.log(keys)
  let key = keys[0];
  return collection.filter((item) => item[key] === q[key])[0] || null;
};

module.exports = {
  list,
  get,
  upsert,
  remove,
  query
};
