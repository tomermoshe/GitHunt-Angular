import {Document} from 'graphql';

import gql from 'graphql-tag';

export const fragments: {
  [key: string]: Document,
} = {
  entry: gql`
    fragment RepoInfo on Entry {
      createdAt
      repository {
        description
        stargazers_count
        open_issues_count
      }
      postedBy {
         html_url
         login
      }
    }
  `,
};
