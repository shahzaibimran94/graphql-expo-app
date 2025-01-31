import { ApolloServer } from 'apollo-server';
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: 'accounts', url: process.env.ACCOUNT_SERVICE_URL || 'http://localhost:4001' },
      { name: 'devices', url: process.env.DEVICE_SERVICE_URL || 'http://localhost:4002' }
    ]
  })
});

const server = new ApolloServer({ gateway });

server.listen({ port: 4000 }).then(({ url }: { url: string }) => {
  console.log(`Gateway running at ${url}`);
});
