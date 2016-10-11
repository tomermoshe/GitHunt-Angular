import {print} from 'graphql-tag/printer';
import {Client} from 'subscriptions-transport-ws';

// quick way to add the subscribe and unsubscribe functions to the network interface
export default function addGraphQLSubscriptions(networkInterface:any, wsClient:Client) {
  return Object.assign(networkInterface, {
    subscribe(request:any, handler:any) {
      return wsClient.subscribe({
        query: print(request.query),
        variables: request.variables,
      }, handler);
    },
    unsubscribe(id:number) {
      wsClient.unsubscribe(id);
    }
  });
}
