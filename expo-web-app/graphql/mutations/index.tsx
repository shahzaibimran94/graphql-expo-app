import { gql } from '@apollo/client';

export const CREATE_ACCOUNT = gql`
  mutation CreateAccount($name: String!, $email: String!) {
    createAccount(name: $name, email: $email) {
      _id
      name
      email
    }
  }
`;

export const CREATE_DEVICE = gql`
  mutation CreateDevice($name: String!, $type: String!, $accountId: String!) {
    createDevice(name: $name, type: $type, accountId: $accountId) {
      name
      type
    }
  }
`;