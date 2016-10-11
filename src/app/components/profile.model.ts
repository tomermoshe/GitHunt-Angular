import gql from 'graphql-tag';

export const CurrentUserQuery = gql`
  query CurrentUserForProfile {
    currentUser {
      login
      avatar_url
    }
  }
`;
