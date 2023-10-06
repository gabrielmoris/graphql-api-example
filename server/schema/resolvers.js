const { UserList, MovieList } = require("../fake-data");
const _ = require("lodash");

const resolvers = {
  Query: {
    // USER RESOLVERS
    users: () => {
      // here I would retrieve data from DB

      //Using union to error handling
      // if (UserList) {
      //   return { users: UserList };
      // } else {
      //   return {
      //     message: "There was an error",
      //   };
      // }
      return UserList;
    },
    user: (parent, args, context, info) => {
      const id = args.id;
      const user = _.find(UserList, { id: Number(id) });
      return user;
    },

    // MOVIE RESOLVERS
    movies: () => {
      return MovieList;
    },
    movie: (parent, args) => {
      const name = args.name;
      const movie = _.find(MovieList, { name });
      return movie;
    },
  },
  User: {
    favouriteMovies: (parent, args, context, info) => {
      // parent returns the object parent if the data returned is nested
      console.log("PARENT: ", parent);
      // args are the arguments of the queries to access data
      console.log("ARGS: ", args);
      // context allows to pass vaules, variables, etc... to the query
      console.log("CONTEXT: ", context);
      console.log("HEADERS: ", context.req.headers);
      // info shows the information of the request
      console.log("INFO: ", info);
      return _.filter(
        MovieList,
        (movie) =>
          movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
      );
    },
  },
  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      const lastId = UserList[UserList.length - 1].id;
      user.id = lastId + 1;
      UserList.push(user);
      return user;
    },
    updateUsername: (parent, args) => {
      const { id, newUsername } = args.input;
      let userUpdated;
      UserList.forEach((user) => {
        if (user.id === Number(id)) {
          user.username = newUsername;
          userUpdated = user;
        }
      });

      return userUpdated;
    },
    deleteUser: (parent, args) => {
      const id = args.id;
      _.remove(UserList, (user) => user.id === Number(id));
      return null;
    },
  },
  //Using union to error handling
  // UsersResult: {
  //   __resolveType() {
  //     if (Object.users) {
  //       return Object.users;
  //     } else {
  //       return Object.message;
  //     }
  //   },
  // },
};

module.exports = { resolvers };
