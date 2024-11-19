const { UserList, MovieList } = require("../fake-data");
const _ = require("lodash");
const fs = require("fs").promises;
const path = require("path");

let isWriting = false;
const writeQueue = [];

async function processWriteQueue() {
  if (isWriting || writeQueue.length === 0) return;

  isWriting = true;
  const nextWrite = writeQueue.shift();

  try {
    await nextWrite();
  } catch (error) {
    console.error("Error in write queue:", error);
  } finally {
    isWriting = false;
    processWriteQueue(); // Process next in queue
  }
}

async function updateFakeData(userList, movieList) {
  return new Promise((resolve, reject) => {
    writeQueue.push(async () => {
      try {
        const fakeDataContent = `const UserList = ${JSON.stringify(
          userList,
          null,
          2
        )};\n\nconst MovieList = ${JSON.stringify(
          movieList,
          null,
          2
        )};\n\nmodule.exports = { UserList, MovieList };`;

        // Use absolute path to ensure consistency
        const filePath = path.resolve(__dirname, "../fake-data.js");

        // First read the file to verify it exists and is accessible
        await fs.access(filePath);

        // Write to a temporary file first
        const tempPath = `${filePath}.temp`;
        await fs.writeFile(tempPath, fakeDataContent, "utf-8");

        // Rename temp file to actual file (atomic operation)
        await fs.rename(tempPath, filePath);

        resolve();
      } catch (error) {
        console.error("Error updating fake-data.js:", error);
        reject(new Error("Failed to update data file"));
      }
    });

    processWriteQueue();
  });
}

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
    createUser: async (parent, args) => {
      const user = args.input;
      const lastId = UserList[UserList.length - 1].id;
      user.id = lastId + 1;
      UserList.push(user);

      await updateFakeData(UserList, MovieList);
      return user;
    },
    updateUsername: async (parent, args) => {
      const { id, newUsername } = args.input;
      let userUpdated;

      UserList.forEach((user) => {
        if (user.id === Number(id)) {
          user.username = newUsername;
          userUpdated = user;
        }
      });

      if (userUpdated) {
        await updateFakeData(UserList, MovieList);
      }

      return userUpdated;
    },
    updateUser: async (parent, args) => {
      const { id, input } = args;
      const userIndex = UserList.findIndex((user) => user.id === Number(id));

      if (userIndex === -1) {
        throw new Error("User not found");
      }

      UserList[userIndex] = {
        ...UserList[userIndex],
        ...input,
        id: Number(id), // Ensure id remains the same
      };

      await updateFakeData(UserList, MovieList);
      return UserList[userIndex];
    },
    deleteUser: async (parent, args) => {
      const id = args.id;
      const userIndex = UserList.findIndex((user) => user.id === Number(id));

      if (userIndex === -1) {
        throw new Error("User not found");
      }

      const deletedUser = UserList[userIndex];
      UserList.splice(userIndex, 1);

      await updateFakeData(UserList, MovieList);
      return deletedUser;
    },
    updateMovie: async (parent, args) => {
      const { name, input } = args;
      const movieIndex = MovieList.findIndex((movie) => movie.name === name);

      if (movieIndex === -1) {
        throw new Error("Movie not found");
      }

      MovieList[movieIndex] = {
        ...MovieList[movieIndex],
        ...input,
        name: input.name || name, // Allow name update if provided
      };

      await updateFakeData(UserList, MovieList);
      return MovieList[movieIndex];
    },
    deleteMovie: async (parent, args) => {
      const { name } = args;
      const movieIndex = MovieList.findIndex((movie) => movie.name === name);

      if (movieIndex === -1) {
        throw new Error("Movie not found");
      }

      const deletedMovie = MovieList[movieIndex];
      MovieList.splice(movieIndex, 1);

      await updateFakeData(UserList, MovieList);
      return deletedMovie;
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
