import ApolloClient, { createNetworkInterface, addTypename } from 'apollo-client';

// Polyfill fetch
import 'whatwg-fetch';

interface Result {
  id?: string;
  __typename?: string;
}

export const client = new ApolloClient({
  networkInterface: createNetworkInterface('/graphql', {
    credentials: 'same-origin',
  }),
  queryTransformer: addTypename,
  dataIdFromObject: (result: Result) => {
    if (result.id && result.__typename) {
      return result.__typename + result.id;
    }
    return null;
  },
  shouldBatch: true,
});
