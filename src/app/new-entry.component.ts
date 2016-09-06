import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Angular2Apollo } from 'angular2-apollo';

import gql from 'graphql-tag';

@Component({
  selector: 'new-entry',
  template: `
    <div>
      <h1>Submit a repository</h1>

      <form (ngSubmit)="_submitForm()">
        <div class="form-group">
          <label for="repositoryInput">
            Repository name
          </label>

          <input
            type="text"
            class="form-control"
            id="repositoryInput"
            placeholder="apollostack/GitHunt"
            [(ngModel)]="repoFullName"
            name="repoFullName"
            required
          />
        </div>

        <div *ngIf="error" class="alert alert-danger" role="alert">
          {{ error }}
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  `
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
