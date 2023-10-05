import React from "react";
import { useQuery, gql } from "@apollo/client";

const QUERY_ALL_USERS = gql`
  query getUsers {
    users {
      id
      age
      name
      username
      nationality
    }
  }
`;

const DisplayData = () => {
  const { data, loading, error } = useQuery(QUERY_ALL_USERS);
  console.log(data);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red", fontSize: "5rem" }}>Error </p>;
  }

  return (
    <div>
      {data &&
        data.users.map((user) => {
          return (
            <div
              style={{
                border: "solid 1px black",
                borderRadius: "4px",
                margin: "1rem 20rem",
                backgroundColor: "#0ff0f020",
                fontFamily: "sans-serif",
              }}
            >
              <div>
                <p>Name: {user.name}</p>
              </div>
              <div>
                <p>User Name: {user.username}</p>
              </div>
              <div>
                <p>Age: {user.age}</p>
              </div>
              <div>
                <p>Nationality: {user.nationality}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default DisplayData;
