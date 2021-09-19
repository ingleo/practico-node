const request = require("request");

const createRemoteDB = (host, port) => {
  const URL = `http://${host}:${port}`;

  function list(table) {
    return req("GET", table);
  }

  const req = (method, table, data) => {
    let url = `${URL}/${table}`;
    let body = "";

    return new Promise((resolve, reject) => {
      request(
        {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          url,
          body,
        },
        (err, req, body) => {
          if (err) {
            console.error("Error con base de datos remota", err);
            return reject(err.message);
          }

          const resp = JSON.parse(body);
          return resolve(resp.body);
        }
      );
    });
  };

  return {
    list,
  };
};

module.exports = createRemoteDB;
