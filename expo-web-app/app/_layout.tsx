import { Stack } from "expo-router";

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://127.0.0.1:4000',
  cache: new InMemoryCache()
});

export default function RootLayout() {
  return <ApolloProvider client={client}>
    <Stack screenOptions={{headerShown: false}} />
  </ApolloProvider>;
}
