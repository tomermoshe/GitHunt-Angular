import Fragment from 'graphql-fragments';
import gql from 'graphql-tag';

export const fragments: {
  [key: string]: Fragment,
} = {
  entry: new Fragment(gql`
    fragment VoteButtons on Entry {
      score
      vote {
        vote_value
      }
    }
  `),
};
