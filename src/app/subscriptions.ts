import {print} from 'graphql-tag/printer';
import {Client} from 'subscriptions-transport-ws';
import {HTTPNetworkInterface} from 'apollo-client/networkInterface';

// quick way to add the subscribe and unsubscribe functions to the network interface
export default function addGraphQLSubscriptions(networkInterface: any, wsClient: Client): HTTPNetworkInterface & Client {
  return Object.assign(networkInterface, {
    subscribe(request: any, handler: any): number {
      return wsClient.subscribe({
        query: print(request.query),
        variables: request.variables,
      }, handler);
    },
    unsubscribe(id: number): void {
      wsClient.unsubscribe(id);
    }
  });
}
