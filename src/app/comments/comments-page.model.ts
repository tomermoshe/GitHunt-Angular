import Fragment from 'graphql-fragments';
import gql from 'graphql-tag';

export const fragments: {
  [key: string]: Fragment
} = {
  comment: new Fragment(gql`
    fragment CommentsPageComment on Comment {
      id
      postedBy {
        login
        html_url
      }
      createdAt
      content
    }
  `),
};

export const commentQuery: any = gql`
  query Comment($repoFullName: String!, $limit: Int, $offset: Int) {
    # Eventually move this into a no fetch query right on the entry
    # since we literally just need this info to determine whether to
    # show upvote/downvote buttons
    currentUser {
      login
      html_url
    }
    entry(repoFullName: $repoFullName) {
      id
      postedBy {
        login
        html_url
      }
      createdAt
      comments(limit: $limit, offset: $offset) {
        ...CommentsPageComment
      }
      commentCount
      repository {
        full_name
        html_url
        description
        open_issues_count
        stargazers_count
      }
    }
  }
`;

export const subscriptionQuery: any = gql`
  subscription onCommentAdded($repoFullName: String!){
    commentAdded(repoFullName: $repoFullName){
      id
      postedBy {
        login
        html_url
      }
      createdAt
      content
    }
  }
`;

export const submitCommentMutation: any = gql`
  mutation submitComment($repoFullName: String!, $commentContent: String!) {
    submitComment(repoFullName: $repoFullName, commentContent: $commentContent) {
      ...CommentsPageComment
    }
  }
`;
