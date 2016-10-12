import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Angular2Apollo, ApolloQueryObservable} from 'angular2-apollo';
import {Subscription} from 'rxjs/Subscription';
import {Subject} from 'rxjs/Subject';

import {OnVoteEvent} from './feed-entry.component';
import {feedQuery, voteInfoFragment, voteMutation} from './feed.model';

@Component({
  selector: 'feed',
  templateUrl: 'feed.component.html'
})
export class FeedComponent implements OnInit, OnDestroy {

  public feed: any;
  public currentUser: any;
  public loading: boolean = true;

  private type: Subject<string> = new Subject<string>();
  private offset: number = 0;
  private itemsPerPage: number = 10;
  private paramsSub: Subscription;
  private feedSub: Subscription;
  private feedObs: ApolloQueryObservable<any>;

  constructor(private route: ActivatedRoute,
              private apollo: Angular2Apollo) {
  }

  public ngOnInit(): void {
    this.feedObs = this.apollo.watchQuery({
      query: feedQuery,
      variables: {
        type: this.type,
        offset: this.offset,
        limit: this.itemsPerPage,
      },
      fragments: voteInfoFragment,
      forceFetch: true,
    });

    this.feedSub = this.feedObs.subscribe(({data, loading}) => {
      this.feed = data.feed;
      this.currentUser = data.currentUser;
      this.loading = loading;
    });

    this.paramsSub = this.route.params.subscribe((params) => {
      this.loading = true;
      this.type.next((params['type'] || 'top').toUpperCase());
    });
  }

  public onVote(event: OnVoteEvent): void {
    this.apollo.mutate({
      mutation: voteMutation,
      variables: {
        repoFullName: event.repoFullName,
        type: event.type,
      },
    });
  }

  public fetchMore(): void {
    this.feedObs.fetchMore({
      variables: {
        offset: this.offset + this.itemsPerPage
      },
      updateQuery: (prev, {fetchMoreResult}) => {
        if (!fetchMoreResult.data) {
          return prev;
        }
        return Object.assign({}, prev, {
          feed: [...prev.feed, ...fetchMoreResult.data.feed],
        });
      },
    });
    this.offset += this.itemsPerPage;
  }

  public ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
    this.feedSub.unsubscribe();
  }
}
