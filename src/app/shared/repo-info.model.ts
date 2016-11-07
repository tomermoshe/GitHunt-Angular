import Fragment from 'graphql-fragments';
import gql from 'graphql-tag';

export const fragments: {
  [key: string]: Fragment,
} = {
  entry: new Fragment(gql`
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
  `),
};
