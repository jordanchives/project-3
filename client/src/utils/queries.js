import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    users {
      _id
      username
      email
      password
    }
    user {
      _id
      username
      email
      password
    }
    games {
      _id
      name
      storyline
      summary
      price
      cover
      genres
    }
    game {
      _id
      name
      storyline
      summary
      price
      cover
      genres
    }
    transactions {
      _id
    }
    transaction {
      _id
    }
  }
`;
