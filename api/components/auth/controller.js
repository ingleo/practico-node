const bcrypt = require("bcrypt");
const auth = require("../../../auth/index");
const error = require("../../../utils/error");

const TABLE = "auth";

module.exports = function (injectedStore) {
  let store = injectedStore;

  if (!store) {
    store = require("../../../store/dummy");
  }

  const login = async (username, password) => {
    const data = await store.query(TABLE, { username: username });
    return bcrypt.compare(password, data.password).then((isEqual) => {
      if (isEqual) {
        return auth.sign(JSON.parse(JSON.stringify(data)));
      } else {
        throw error("Información inválida", 400);
      }
    });
  };

  const upsert = async (data) => {
    const authData = {
      id: data.id,
    };

    if (data.username) {
      authData.username = data.username;
    }

    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 10);
    }

    return store.upsert(TABLE, authData);
  };

  return {
    login,
    upsert,
  };
};
