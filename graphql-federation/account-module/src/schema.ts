import { gql } from 'graphql-tag';

export const accountTypeDefs = gql`
  type Account @key(fields: "_id") {
    _id: ID!
    name: String!
    email: String!
    devices: [Device]
  }

  extend type Query {
    accounts: [Account]
    account(id: ID!): Account
  }

  extend type Mutation {
    createAccount(name: String!, email: String!): Account
  }

  extend type Device @key(fields: "_id") {
    _id: ID! @external
  }
`;
