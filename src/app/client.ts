import {HTTPNetworkInterface} from 'apollo-client/networkInterface';
import ApolloClient, {createNetworkInterface, addTypename} from 'apollo-client';
import {Client} from 'subscriptions-transport-ws';

import addGraphQLSubscriptions from './subscriptions';

// Polyfill fetch
import 'whatwg-fetch';

interface Result {
  id?: string;
  __typename?: string;
}

const wsClient: Client = new Client('ws://localhost:8080');

const networkInterface: HTTPNetworkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin',
  },
  transportBatching: true,
});

const networkInterfaceWithSubscriptions: HTTPNetworkInterface & Client = addGraphQLSubscriptions(
  networkInterface,
  wsClient,
);

export const client: ApolloClient = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  queryTransformer: addTypename,
  dataIdFromObject: (result: Result) => {
    if (result.id && result.__typename) {
      return result.__typename + result.id;
    }
    return null;
  },
  shouldBatch: true,
});
