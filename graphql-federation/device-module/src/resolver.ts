import { Device } from './model';
import { GraphQLError } from 'graphql';
import fetch from "node-fetch";

export const deviceResolvers = {
  Query: {
    devices: async (_: any, { accountId }: { accountId: string }) => {
      console.log("Querying devices for accountId:", accountId);
      try {
        if (!accountId) {
          const devices = await Device.find().lean();
          return devices || [];
        } else {
          const device = await Device.find({ accountId }).lean();
          return device;
        }
      } catch (e) {
        console.error('Device fetch error: ', e);
        throw new GraphQLError('Failed to fetch devices');
      }
    },
    device: async (_: any, { id }: { id: string }) => {
      const device = await Device.findById(id).lean();
      return device;
    }
  },
  Mutation: {
    createDevice: async (_: any, { name, type, accountId }: { name: string; type: string, accountId: string }) => {
      try {
        if (!name || !type || !accountId) {
          throw new GraphQLError("Name, Type and Account are required", {
            extensions: { code: "BAD_USER_INPUT" },
          });
        }
  
        const device = await Device.findOne({ name, accountId });
  
        if (device) {
          throw new GraphQLError("Device with the same name already exists", {
            extensions: { code: "DEVICE_ALREADY_EXISTS" },
          });
        }
  
        const newDevice = new Device({ name, type, accountId });
        return await newDevice.save();
      } catch (error: any) {
        console.error("Device creation error:", error);
        throw new GraphQLError(error.message || "Failed to create device", {
          extensions: {
            code: error.extensions?.code || "INTERNAL_SERVER_ERROR",
            details: error.message,
          },
        });
      }
    }
  },
  Device: {
    account: async (device: any) => {
      console.log("Resolving account for device:", device._id);
      
      try {
        const url = process.env.ACCOUNT_GRAPHQL_URL || "http://localhost:4001/graphql";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            query: `
              query GetAccount($id: ID!) {
                account(id: $id) {
                  _id
                  name
                  email
                }
              }
            `,
            variables: { id: device.accountId }
          })
        });

        const data = await response.json();
        
        if (data.errors) {
          console.error("GraphQL Error from Account service:", data.errors);
          return null;
        }

        return {
          __typename: "Account",
          ...data.data.account
        };
      } catch (error) {
        console.error("Error fetching account:", error);
        return null;
      }
    },
    __resolveReference: async (ref: { _id: string }) => {
      console.log("Resolving Device reference:", ref._id);
      return Device.findById(ref._id).lean();
    }
  }
};
