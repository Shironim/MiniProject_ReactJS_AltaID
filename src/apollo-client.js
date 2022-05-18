import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.REACT_APP_SERVER_GRAPHQL,
  cache: new InMemoryCache(),
  headers: {
    'x-hasura-admin-secret': process.env.REACT_APP_SECRET_KEY
  }
})

export default client;