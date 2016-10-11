import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Angular2Apollo } from 'angular2-apollo';

import gql from 'graphql-tag';

@Component({
  selector: 'new-entry',
  templateUrl: 'new-entry.component.html'
})
export class NewEntryComponent {
  error: string;
  repoFullName: string;

  constructor(
    private router: Router,
    private apollo: Angular2Apollo
  ) { }

  _submitForm(): void {
    if (!this.repoFullName) {
      return;
    }

    this.error = null;

    this.apollo.mutate({
      mutation: gql`
        mutation submitRepository($repoFullName: String!) {
          submitRepository(repoFullName: $repoFullName) {
            createdAt
          }
        }
      `,
      variables: {
        repoFullName: this.repoFullName,
      },
    }).then(() => {
      this.router.navigate(['/feed/new']);
    }).catch((error) => {
      this.error = error.message;
    });
  }
}
