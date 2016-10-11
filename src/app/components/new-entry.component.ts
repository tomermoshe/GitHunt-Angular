import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Angular2Apollo} from 'angular2-apollo';
import {submitRepositoryMutation} from './new-entry.model';

@Component({
  selector: 'new-entry',
  templateUrl: 'new-entry.component.html'
})
export class NewEntryComponent {
  error:string;
  repoFullName:string;

  constructor(private router:Router,
              private apollo:Angular2Apollo) {
  }

  _submitForm():void {
    if (!this.repoFullName) {
      return;
    }

    this.error = null;

    this.apollo.mutate({
      mutation: submitRepositoryMutation,
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
