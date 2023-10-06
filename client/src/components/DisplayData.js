import React, { useState } from "react";
import { useQuery, gql, useLazyQuery, useMutation } from "@apollo/client";

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

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      id
    }
  }
`;

const DisplayData = () => {
  const { data, loading, error, refetch } = useQuery(QUERY_ALL_USERS);
  const { data: moviesData } = useQuery(QUERY_ALL_MOVIES);
  const [movieSearch, setMovieSearch] = useState("");
  const [createUser, setCreateUser] = useState({});

  const [fetchMovie, { data: movieSearchedData, error: movieError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);

  const [createUserGQL] = useMutation(CREATE_USER_MUTATION);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.log(error);
    return <p style={{ color: "red", fontSize: "5rem" }}>Error </p>;
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "5px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "200px",
          margin: "50px",
        }}
      >
        <input
          style={{
            width: "200px",
            margin: "2px",
          }}
          type="text"
          placeholder="Name..."
          onChange={(e) =>
            setCreateUser({ ...createUser, name: e.target.value })
          }
        />
        <input
          style={{
            width: "200px",
            margin: "2px",
          }}
          type="text"
          placeholder="Username..."
          onChange={(e) =>
            setCreateUser({ ...createUser, username: e.target.value })
          }
        />
        <input
          style={{
            width: "200px",
            margin: "2px",
          }}
          type="number"
          placeholder="Age..."
          onChange={(e) =>
            setCreateUser({ ...createUser, age: Number(e.target.value) })
          }
        />

        <select
          name="country"
          id="country"
          onChange={(e) =>
            setCreateUser({
              ...createUser,
              nationality: e.target.value,
            })
          }
          style={{
            width: "207px",
            margin: "2px",
          }}
        >
          <option value="">Nationality...</option>
          <option value="USA">USA</option>
          <option value="Spain">Spain</option>
          <option value="UK">UK</option>
          <option value="Canada">Canada</option>
          <option value="Egypt">Egypt</option>
          <option value="Brazil">Brazil</option>
          <option value="Korea">Korea</option>
          <option value="Italy">Italy</option>
          <option value="Japan">Japan</option>
          <option value="Mexico">Mexico</option>
          <option value="Russia">Russia</option>
          <option value="Argentina">Argentina</option>
          <option value="China">China</option>
          <option value="Iran">Iran</option>
          <option value="Pakistan">Pakistan</option>
          <option value="Arabia">Arabia</option>
          <option value="France">France</option>
        </select>
        <button
          style={{
            width: "207px",
            margin: "2px",
          }}
          onClick={() => {
            if (createUser.name && createUser.username && createUser.age) {
              createUserGQL({
                variables: { input: createUser },
              });
              refetch();
            }
          }}
        >
          Create user
        </button>
      </div>
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
                margin: "1rem",
                backgroundColor: "#ff000020",
                fontFamily: "sans-serif",
                width: "400px",
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
          width: "100vw",
        }}
      >
        {data &&
          data.users.map((user) => {
            return (
              <div
                key={user.id}
                style={{
                  border: "solid 1px black",
                  borderRadius: "4px",
                  margin: "1rem",
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
          width: "100vw",
        }}
      >
        {moviesData &&
          moviesData.movies.map((movie) => {
            return (
              <div
                key={movie.id}
                style={{
                  border: "solid 1px black",
                  borderRadius: "4px",
                  margin: "1rem",
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
    </div>
  );
};

export default DisplayData;
