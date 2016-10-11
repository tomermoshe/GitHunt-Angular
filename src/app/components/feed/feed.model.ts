import {createFragment} from 'apollo-client';
import gql from 'graphql-tag';

export const voteInfoFragment = createFragment(gql`
  fragment voteInfo on Entry {
    score
    vote {
      vote_value
    }
  }
`);

export const feedQuery = gql`
  query Feed($type: FeedType!, $offset: Int, $limit: Int) {
    currentUser {
      login
    }
    feed(type: $type, offset: $offset, limit: $limit) {
      createdAt
      commentCount
      id
      postedBy {
        login
        html_url
      }
      ...voteInfo
      repository {
        name
        full_name
        description
        html_url
        stargazers_count
        open_issues_count
        owner {
          avatar_url
        }
      }
    }
  }
`;

export const voteMutation = gql`
  mutation vote($repoFullName: String!, $type: VoteType!) {
    vote(repoFullName: $repoFullName, type: $type) {
      score
      id
      vote {
        vote_value
      }
    }
  }
`;
