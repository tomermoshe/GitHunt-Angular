import {Document} from 'graphql';

import gql from 'graphql-tag';

export const fragments: {
  [key: string]: Document,
} = {
  entry: gql`
    fragment VoteButtons on Entry {
      score
      vote {
        vote_value
      }
    }
  `,
};
