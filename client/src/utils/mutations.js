import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const AUTH_USER = gql`
  mutation authenticateUser(username: String!, password: String!) {
    authenticateUser(username: String!, password: String!) {
      success
      message 
      user {
        _id
        username
      }
    }
  }
`;