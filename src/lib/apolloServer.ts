// lib/apolloServer.ts
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
export const apolloServerClient = new ApolloClient({
  ssrMode: true,
  link: new HttpLink({
    uri: "https://graphql.anilist.co",
    fetch: globalThis.fetch,
  }),
  cache: new InMemoryCache(),
});
