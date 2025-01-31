import { ApolloServer } from 'apollo-server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { accountTypeDefs } from './schema';
import { accountResolvers } from './resolver';
import mongoose from 'mongoose';

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs: accountTypeDefs, resolvers: accountResolvers }),
});

server.listen({ port: 4001, host: '0.0.0.0' }).then(({ url }: { url: string }) => {
  console.log(`Account service running at ${url}`);
  
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/accountdb')
  .then(() => console.log('Account Database Connected!'))
  .catch((error) => console.log('Account Database Connection Failed!', error));
});
