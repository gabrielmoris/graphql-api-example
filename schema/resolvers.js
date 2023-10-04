const { UserList } = require("../fake-data");
const resolvers = {
  Query: {
    users() {
      // here I would retrieve data from DB
      return UserList;
    },
  },
};

module.exports = { resolvers };
