const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema/type-defs");
const { resolvers } = require("./schema/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return { whatIsContext: "here I can pass information to the queries", req };
  },
});

server.listen().then(({ url }) => {
  console.log(`Apollo Server is running at ${url} . . .`);
});
