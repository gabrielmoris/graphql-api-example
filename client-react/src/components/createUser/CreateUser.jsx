import React, { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import "./createUser.styles.css";

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      id
    }
  }
`;

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

const CreateUser = () => {
  const { refetch } = useQuery(QUERY_ALL_USERS);
  const [createUserGQL] = useMutation(CREATE_USER_MUTATION);
  const [createUser, setCreateUser] = useState({});

  return (
    <div>
      <div className="createuser-wrapper">
        <input
          type="text"
          placeholder="Name..."
          onChange={(e) =>
            setCreateUser({ ...createUser, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Username..."
          onChange={(e) =>
            setCreateUser({ ...createUser, username: e.target.value })
          }
        />
        <input
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
          className="create-user-btn"
          onClick={() => {
            if (createUser.name && createUser.username && createUser.age) {
              createUserGQL({
                variables: { input: createUser },
              });
              setTimeout(() => refetch(), 200);
            }
          }}
        >
          Create user
        </button>
      </div>
    </div>
  );
};

export default CreateUser;
