const mysql = require("mysql");
const config = require("../config");

const dbconfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

let connection;

const handleConnection = () => {
  connection = mysql.createConnection(dbconfig);

  connection.connect((err) => {
    if (err) {
      console.error("[db error]", err);
      setTimeout(handleConnection, 2000);
    } else {
      console.log("DB Connected");
    }
  });

  connection.on("error", (err) => {
    console.error("[db error]", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleConnection();
    } else {
      throw err;
    }
  });
};

handleConnection();

const list = (table) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

const get = (table, id) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE id='${id}'`, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

const insert = (table, data) => {
  console.log(table, data);
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const update = (table, data) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ${table} SET ? WHERE id=?`,
      [data, data.id],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

const upsert = async (table, data) => {
  let row = [];
  if (data.id) {
    row = await get(table, data.id);
  }
  if (row.length === 0) {
    return insert(table, data);
  } else {
    return update(table, data);
  }
};

const query = (table, query, join) => {
  let joinQuery = "";
  if (join) {
    const key = Object.keys(join)[0];
    const val = join[key];
    joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
  }
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`,
      query,
      (err, result) => {
        if (err) return reject(err);
        resolve(result || null);
      }
    );
  });
};

module.exports = {
  list,
  get,
  insert,
  upsert,
  query,
};
