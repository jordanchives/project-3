import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const AUTH_USER = gql`
  mutation authenticateUser($username: String!, $password: String!) {
    authenticateUser(username: $username, password: $password) {
      success
      message 
      user {
        _id
        username
      }
    }
  }
`;

export const TRANSACTION = gql`
  mutation addTransaction($transaction: TransactionInput!) {
    addTransaction(transaction: $transaction) {
      _id
      purchaseDate
      games {
        _id
        name
        price
      }
    }
  }
`;