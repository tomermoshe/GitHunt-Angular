import {Apollo} from 'angular2-apollo';

import {client} from './client';

export default function GraphQL(options: any): any {
  if (!options.client) {
    options.client = client;
  }

  return Apollo(options);
}
