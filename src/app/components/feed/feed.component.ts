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
  feed:any;
  currentUser:any;
  loading:boolean = true;
  type:Subject<string> = new Subject<string>();
  offset:number = 0;
  itemsPerPage:number = 10;
  paramsSub:Subscription;
  feedSub:Subscription;
  feedObs:ApolloQueryObservable<any>;

  constructor(private route:ActivatedRoute,
              private apollo:Angular2Apollo) {
  }

  ngOnInit() {
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

  onVote(event:OnVoteEvent):void {
    this.apollo.mutate({
      mutation: voteMutation,
      variables: {
        repoFullName: event.repoFullName,
        type: event.type,
      },
    });
  }

  fetchMore() {
    this.feedObs.fetchMore({
      variables: {
        offset: this.offset + this.itemsPerPage,
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

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    this.feedSub.unsubscribe();
  }
}
