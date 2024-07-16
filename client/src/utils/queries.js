import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query {
    users {
      _id
      username
      email
    }
  }
`;

export const QUERY_USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      _id
      username
      email
      library {
        _id
        name
        price
        cover
        genres
      }
    }
  }
`;

export const QUERY_GAMES = gql`
  query {
    games {
      _id
      name
      storyline
      summary
      price
      cover
      genres
    }
  }
`;

export const QUERY_GAME_ID = gql`
  query gameById($id: ID!) {
    gameById(id: $id) {
      _id
      name
      storyline
      summary
      price
      cover
      genres
    }
  }
`;

export const QUERY_GAMES_NAME = gql`
  query gamesByName($name: String!) {
    gamesByName(name: $name) {
      _id
      name
      storyline
      summary
      price
      cover
      genres
    }
  }
`;

export const QUERY_GAMES_GENRE = gql`
  query gamesbyGenre($name: String!) {
    games(genre: $name) {
      _id
      name
      storyline
      summary
      price
      cover
      genres
    }
  }
`;

export const QUERY_TRANSACTIONS = gql`
  query {
    transactions {
      _id
    }
  }
`;

export const QUERY_TRANSACTION = gql`
  query Transaction($id: ID!) {
    transaction(id: $id) {
      _id
    }
  }
`;
