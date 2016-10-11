import {Component, OnInit, OnDestroy} from '@angular/core';
import {Angular2Apollo} from 'angular2-apollo';
import {Subscription} from 'rxjs/Subscription';
import {CurrentUserQuery} from './profile.model';

@Component({
  selector: 'profile',
  templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit, OnDestroy {
  loading:boolean = true;
  currentUser:any;
  currentUserSub:Subscription;

  constructor(private apollo:Angular2Apollo) {
  }

  ngOnInit() {
    this.currentUserSub = this.apollo.watchQuery({
      query: CurrentUserQuery,
    }).subscribe(({data, loading}) => {
      this.currentUser = data.currentUser;
      this.loading = loading;
    });
  }

  ngOnDestroy() {
    this.currentUserSub.unsubscribe();
  }
}
