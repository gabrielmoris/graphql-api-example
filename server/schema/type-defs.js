const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: Nationality!
    friends: [User]
    favouriteMovies: [Movie]
  }

  type Movie {
    id: ID!
    name: String!
    yearOfPublication: Int!
    isInTheaters: Boolean!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
    movies: [Movie!]!
    movie(name: String!): Movie!
  }

  input CreateUserInput {
    name: String!
    username: String!
    age: Int = 18
    nationality: Nationality = Spain
  }

  input UpdateUserNameInput {
    id: ID!
    newUsername: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUsername(input: UpdateUserNameInput!): User
    deleteUser(id: ID!): User
  }

  enum Nationality {
    USA
    Canada
    UK
    Spain
    Egypt
    Brazil
    Korea
    Italy
    Japan
    Mexico
    Russia
    Argentina
    China
    Iran
    Pakistan
    Arabia
    France
  }
`;

//Using union to error handling
// type Query {
//   users: UsersResult
//   user(id: ID!): User!
//   movies: [Movie!]!
//   movie(name: String!): Movie!
// }

// I create the types of 2 options
// type UsersSuccessfulResult {
//   users: [User!]!
// }

// type UsersErrorResult {
//   message: String!
// }

//I create the union
// union UsersResult = UsersSuccessfulResult | UsersErrorResult

module.exports = { typeDefs };
