const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema/type-defs");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(() => {
  console.log(`Apollo Server is running at ${url} . . .`);
});
