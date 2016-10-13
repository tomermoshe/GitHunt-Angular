import gql from 'graphql-tag';

export const CurrentUserQuery: any = gql`
  query CurrentUserForProfile {
    currentUser {
      login
      avatar_url
    }
  }
`;
