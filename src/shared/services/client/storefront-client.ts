import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  // gql,
} from '@apollo/client/core';
// import { gql, useQuery } from '@apollo/client';
import fetch from 'cross-fetch';

// export const client = new ApolloClient({
//   link: new HttpLink({
//     uri: process.env.STOREFRONT_URI,
//     fetch,
//     headers: {
//       Authorization: process.env.STOREFRONT_AUTHORIZATION,
//       'Content-Type': 'application/json',
//     },
//   }),
//   cache: new InMemoryCache(),
// });

// export default client;

export async function createClient() {
  const client = new ApolloClient({
    link: new HttpLink({
      uri: process.env.STOREFRONT_URI,
      fetch,
      headers: {
        Authorization: process.env.STOREFRONT_AUTHORIZATION,
        'Content-Type': 'application/json',
      },
    }),
    cache: new InMemoryCache(),
  });
  // console.log(client);

  return client;
}

export async function executeQuery(gqlQuery, gqlVariables?) {
  try {
    const client = await createClient();

    return (
      client
        .query({
          query: gqlQuery,
          variables: gqlVariables,
        })
        // .then((result) => console.log(JSON.stringify(result)));
        .then((result) => {
          // return JSON.stringify(result);
          return result;
        })
    );
  } catch (err) {
    console.error(err);
  }
}

export async function executeMutation(gqlMutation, gqlVariables?) {
  try {
    const client = await createClient();
    // console.log(JSON.stringify(gqlMutation));
    console.log(gqlVariables);

    const response = client
      .mutate({
        mutation: gqlMutation,
        variables: gqlVariables,
      })
      .then((result) => {
        // return JSON.stringify(result);
        return result;
      });
    // .then((result) => console.log(JSON.stringify(result)));

    return response;
  } catch (err) {
    console.error(err);
  }
}

// import { Client, createClient } from '@urql/core';

// export function createGraphqlClient(): Client {
//   return createClient({
//     // url: 'https://graphql-dev.cart.com/', // The default client url
//     url: 'http://localhost:3005/graphql',
//     fetchOptions: {
//       method: 'POST',
//       // headers: {
//       //   Authorization: `DirectStore ewoJIlN0b3JlX0RvbWFpbiIgOiAiaHR0cHM6Ly9hbGV4dGVzdHN0b3JlLmFtZXJpY29tbWVyY2UuY29tIiwKCSJBQ19BdXRoX1Rva2VuIiA6ICI5MGRlMDk0MmMyYTRhNGU2MGQ5YzNjOTQ5ZGEyODI3ZCIKfQ==`,
//       //   'Content-Type': 'application/json',
//       // },
//     },
//     preferGetMethod: true,
//     exchanges: [],
//   });
// }

// export function createGraphqlClient(): Client {
//   return createClient({
//     url: 'your-api-url', // The default client url
//     fetchOptions: {
//       credentials: 'same-origin',
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ...`,
//         'Content-Type': 'application/json',
//       },
//     },
//     preferGetMethod: true,
//     exchanges: [],
//   });
// }
