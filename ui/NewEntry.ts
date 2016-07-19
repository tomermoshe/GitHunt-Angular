import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import {
  Router
} from '@angular/router-deprecated';

import {
  Apollo
} from 'angular2-apollo';

import {
  ApolloQueryResult
} from 'apollo-client';

import gql from 'graphql-tag';

import {
  client
} from './client.ts';

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
@Apollo({
  client,
  mutations(context: NewEntry) {
    return {
      submitRepository: (repoFullName) => ({
        mutation: gql`
          mutation submitRepository($repoFullName: String!) {
            submitRepository(repoFullName: $repoFullName) {
              createdAt
            }
          }
        `,
        variables: {
          repoFullName,
        },
      }),
    };
  }
})
export class NewEntry {
  error: string;
  repoFullName: string;
  submitRepository: (repoFullName: string) => Promise<ApolloQueryResult>

  constructor(private router: Router) { }

  _submitForm(): void {
    if (!this.repoFullName) {
      return;
    }

    this.error = null;
    this.submitRepository(this.repoFullName).then(({ data }) => {
      this.router.navigate(['Feed', { type: 'new' }]);
    }).catch((errors) => {
      this.error = errors[0].message;
    });
  }
}
