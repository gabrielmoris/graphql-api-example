import React, { useState } from "react";
import { useQuery, gql, useLazyQuery, useMutation } from "@apollo/client";
import CreateUser from "../createUser/CreateUser";
import "./displayData.styles.css";

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

const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId) {
      id
    }
  }
`;

const DisplayData = () => {
  const { data, loading, error, refetch } = useQuery(QUERY_ALL_USERS);
  const { data: moviesData } = useQuery(QUERY_ALL_MOVIES);
  const [movieSearch, setMovieSearch] = useState("");
  const [deleteUserGQL] = useMutation(DELETE_USER_MUTATION);

  const [fetchMovie, { data: movieSearchedData, error: movieError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.log(error);
    return <p style={{ color: "red", fontSize: "5rem" }}>Error </p>;
  }

  return (
    <section className="content-wrapper">
      <CreateUser />

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
            <div className="movie-data-wrapper">
              <h1>Movie: {movieSearchedData.movie.name}</h1>
              <h1>
                Year of publication: {movieSearchedData.movie.yearOfPublication}
              </h1>
            </div>
          )}

          {movieError && (
            <p className="movie-error">No film with this title.</p>
          )}
        </div>
      </div>
      <div className="users-wrapper">
        {data &&
          data.users.map((user) => {
            return (
              <div key={user.id} className="user-card">
                <div className="close-icn">
                  <span
                    onClick={() => {
                      deleteUserGQL({
                        variables: { deleteUserId: user.id },
                      });
                      setTimeout(() => refetch(), 500);
                    }}
                  >
                    x
                  </span>
                </div>
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
      <div className="movies-wrapper">
        {moviesData &&
          moviesData.movies.map((movie) => {
            return (
              <div key={movie.id} className="movie-card">
                <div>
                  <p>Name: {movie.name}</p>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default DisplayData;
