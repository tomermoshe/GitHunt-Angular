import {Component, OnInit, OnDestroy} from '@angular/core';
import {Angular2Apollo} from 'angular2-apollo';
import {Subscription} from 'rxjs/Subscription';
import {CurrentUserQuery} from './profile.model';

@Component({
  selector: 'profile',
  templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit, OnDestroy {
  public loading: boolean = true;
  public currentUser: any;

  private currentUserSub: Subscription;

  constructor(private apollo: Angular2Apollo) {
  }

  public ngOnInit(): void {
    this.currentUserSub = this.apollo.watchQuery({
      query: CurrentUserQuery,
    }).subscribe(({data, loading}) => {
      this.currentUser = data.currentUser;
      this.loading = loading;
    });
  }

  public ngOnDestroy(): void {
    this.currentUserSub.unsubscribe();
  }
}
