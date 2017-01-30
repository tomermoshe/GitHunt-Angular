import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Apollo} from 'apollo-angular';

import 'rxjs/add/operator/toPromise';

import {submitRepositoryMutation} from './new-entry.model';

@Component({
  selector: 'app-new-entry',
  templateUrl: 'new-entry.component.html'
})
export class NewEntryComponent {
  public error: string;
  public repoFullName: string;

  constructor(private router: Router,
              private apollo: Apollo) {
  }

  public submitForm(): void {
    if (!this.repoFullName) {
      return;
    }

    this.error = null;

    this.apollo.mutate({
      mutation: submitRepositoryMutation,
      variables: {
        repoFullName: this.repoFullName,
      },
    })
      .toPromise()
      .then(() => {
        this.router.navigate(['/feed/new']);
      }).catch((error) => {
        this.error = error.message;
      });
  }
}
