import { ApolloServer } from 'apollo-server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { deviceTypeDefs } from './schema';
import { deviceResolvers } from './resolver';
import mongoose from 'mongoose';

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs: deviceTypeDefs, resolvers: deviceResolvers }),
});

server.listen({ port: 4002, host: '0.0.0.0' }).then(({ url }: { url: string }) => {
  console.log(`Device service running at ${url}`);
  
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/devicedb')
  .then(() => console.log('Device Database Connected!'))
  .catch((error) => console.log('Device Database Connection Failed!', error));
});
