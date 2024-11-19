import gql from "graphql-tag";

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      username
      age
      nationality
      friends {
        id
        name
      }
    }
  }
`;

export const GET_USER = gql`
  query GetUser($userId: ID!) {
    user(id: $userId) {
      id
      name
      username
      age
      nationality
      friends {
        id
        name
      }
    }
  }
`;
