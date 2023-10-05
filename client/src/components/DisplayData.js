import React, { useState } from "react";
import { useQuery, gql, useLazyQuery } from "@apollo/client";

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

const QUERY_ALL_MOVIES = gql`
  query getMovies {
    movies {
      id
      name
    }
  }
`;

const GET_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`;

const DisplayData = () => {
  const { data, loading, error } = useQuery(QUERY_ALL_USERS);
  const { data: moviesData } = useQuery(QUERY_ALL_MOVIES);
  const [movieSearch, setMovieSearch] = useState("");
  const [fetchMovie, { data: movieSearchedData, error: movieError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);

  console.log(data);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red", fontSize: "5rem" }}>Error </p>;
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="The Lord of the Rings"
          onChange={(e) => setMovieSearch(e.target.value)}
        />
        <button
          onClick={() =>
            fetchMovie({
              variables: { name: movieSearch },
            })
          }
        >
          Fetch Data
        </button>

        <div>
          {movieSearchedData && (
            <div
              style={{
                border: "solid 1px black",
                borderRadius: "4px",
                margin: "1rem 20rem",
                backgroundColor: "#ff000020",
                fontFamily: "sans-serif",
              }}
            >
              <h1>Movie: {movieSearchedData.movie.name}</h1>
              <h1>
                Year of publication: {movieSearchedData.movie.yearOfPublication}
              </h1>
            </div>
          )}

          {movieError && (
            <p style={{ color: "red", fontSize: "2rem" }}>
              No film with this title.{" "}
            </p>
          )}
        </div>
      </div>

      {data &&
        data.users.map((user) => {
          return (
            <div
              key={user.id}
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
      {moviesData &&
        moviesData.movies.map((movie) => {
          return (
            <div
              key={movie.id}
              style={{
                border: "solid 1px black",
                borderRadius: "4px",
                margin: "1rem 20rem",
                backgroundColor: "#ff000020",
                fontFamily: "sans-serif",
              }}
            >
              <div>
                <p>Name: {movie.name}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default DisplayData;
