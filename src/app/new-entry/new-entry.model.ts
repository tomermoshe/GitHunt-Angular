import gql from 'graphql-tag';

export const submitRepositoryMutation: any = gql`
  mutation submitRepository($repoFullName: String!) {
    submitRepository(repoFullName: $repoFullName) {
      createdAt
    }
  }
`;
