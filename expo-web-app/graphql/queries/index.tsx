import { gql } from '@apollo/client';

export const GET_ACCOUNTS = gql`
  query GetAccounts {
    accounts {
      _id
      name
      email
    }
  }
`;

export const GET_ACCOUNT_DEVICES = gql`
  query GetAccountDevices($id: ID!) {
    account(id: $id) {
      _id
      name
      devices {
        name
        type
      }
    }
  }
`;