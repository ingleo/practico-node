const { nanoid } = require("nanoid");
const auth = require("../auth");

const TABLE = "user";

module.exports = function (injectedStore) {
  let store = injectedStore;

  if (!store) {
    store = require("../../../store/dummy");
  }

  const list = () => store.list(TABLE);

  const get = (id) => store.get(TABLE, id);

  const upsert = async (body) => {
    const user = {
      name: body.name,
      username: body.username,
    };

    if (body.id) {
      user.id = body.id;
    } else {
      user.id = nanoid();
    }

    if (body.password || body.username) {
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: body.password,
      });
    }

    return store.upsert(TABLE, user);
  };

  const follow = (fromId, toId) => {
    return store.upsert(`${TABLE}_follow`, {
      user_from: fromId,
      user_to: toId,
    });
  };

  const following = async (user) => {
    const join = {};
    join[TABLE] = "user_to"; // { user: user_to }
    const query = { user_from: user };

    return await store.query(`${TABLE}_follow`, query, join);
  };

  return {
    list,
    get,
    upsert,
    follow,
    following
  };
};
