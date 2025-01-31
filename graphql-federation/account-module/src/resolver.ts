import { GraphQLError } from 'graphql';
import { Account } from './model';
import fetch from "node-fetch";

const isEmailValid = (email: string): boolean => {
  const match = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

  return !!match;
};

export const accountResolvers = {
  Query: {
    accounts: async () => {
      try {
        const accounts = await Account.find().lean();
        return accounts || [];
      } catch (e) {
        console.error('Account fetch error: ', e);
        throw new GraphQLError('Failed to fetch accounts');
      }
    },
    account: async (_: any, { id }: { id: string }) => {
      const account = await Account.findById(id).lean();
      return account;
    },
  },
  Mutation: {
    createAccount: async (_: any, { name, email }: { name: string; email: string }) => {
      try {
        if (!name || !email) {
          throw new GraphQLError("Name and email are required", {
            extensions: { code: "BAD_USER_INPUT" },
          });
        }

        if (email && !isEmailValid(email)) {
          throw new GraphQLError("Please provide a valid email", {
            extensions: { code: "BAD_USER_INPUT" },
          });
        }
  
        const account = await Account.findOne({ email });
  
        if (account) {
          throw new GraphQLError("Account with this email already exists", {
            extensions: { code: "ACCOUNT_ALREADY_EXISTS" },
          });
        }
  
        const newAccount = new Account({ name, email });
        return await newAccount.save();
      } catch (error: any) {
        console.error("Account creation error:", error);
        throw new GraphQLError(error.message || "Failed to create account", {
          extensions: {
            code: error.extensions?.code || "INTERNAL_SERVER_ERROR",
            details: error.message,
          },
        });
      }
    }
  },
  Account: {
    devices: async (parent: any) => {
      console.log("Fetching devices for account:", parent._id);

      try {
        const url = process.env.DEVICE_GRAPHQL_URL || "http://localhost:4002/graphql";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            query: `
              query ($accountId: ID!) {
                devices(accountId: $accountId) {
                  _id
                  name
                }
              }
            `,
            variables: { accountId: parent._id }
          })
        });

        const data = await response.json();
        
        if (data.errors) {
          console.error("GraphQL Error from Device service:", data.errors);
          return [];
        }

        console.log("Fetched devices:", data.data.devices);
        return data.data.devices || [];
      } catch (error) {
        console.error("Error fetching devices:", error);
        return [];
      }
    },
    __resolveReference: async (ref: { _id: string }) => {
      console.log("Resolving Account reference:", ref._id);
      return await Account.findById(ref._id).lean();
    }
  }
};
