import { gql } from 'graphql-tag';

export const deviceTypeDefs = gql`
  type Device @key(fields: "_id") {
    _id: ID!
    name: String!
    type: String!
    accountId: ID!
    account: Account
  }

  extend type Query {
    devices(accountId: ID): [Device]
    device(id: ID!): Device
  }

  extend type Mutation {
    createDevice(name: String!, type: String!, accountId: String!): Device
  }

  extend type Account @key(fields: "_id") {
    _id: ID! @external
  }
`;
