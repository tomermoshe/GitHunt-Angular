import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApolloQueryResult } from 'apollo-client';
import { Subscription } from 'rxjs/Subscription';

import { OnVoteEvent } from './feed-entry.component';

import gql from 'graphql-tag';
import GraphQL from '../graphql';

@Component({
  selector: 'feed',
  template: `
    <loading *ngIf="data.loading"></loading>
    <div *ngIf="!data.loading">
      <feed-entry
        *ngFor="let entry of data.feed"
        [entry]="entry"
        [currentUser]="data.currentUser"
        (onVote)="onVote($event)">
      </feed-entry>

      <a (click)="fetchMore()">Load more</a>
    </div>
  `
})
@GraphQL({
  queries(context: FeedComponent) {
    return {
      data: {
        query: gql`
          query Feed($type: FeedType!, $offset: Int, $limit: Int) {
            currentUser {
              login
            }
            feed(type: $type, offset: $offset, limit: $limit) {
              createdAt
              score
              commentCount
              id
              postedBy {
                login
                html_url
              }
              vote {
                vote_value
              }
              repository {
                name
                full_name
                description
                html_url
                stargazers_count
                open_issues_count
                created_at
                owner {
                  avatar_url
                }
              }
            }
          }
        `,
        variables: {
          type: context.type ? context.type.toUpperCase() : 'TOP',
          offset: 0,
          limit: context.itemsPerPage,
        },
        forceFetch: true,
      }
    };
  },
  mutations(context: FeedComponent) {
    return {
      vote: (repoFullName, type) => ({
        mutation: gql`
          mutation vote($repoFullName: String!, $type: VoteType!) {
            vote(repoFullName: $repoFullName, type: $type) {
              score
              id
              vote {
                vote_value
              }
            }
          }
        `,
        variables: {
          repoFullName,
          type,
        },
      })
    };
  }
})
export class FeedComponent implements OnInit, OnDestroy {
  data: any;
  type: string;
  vote: (repoFullName: string, type: string) => Promise<ApolloQueryResult>;
  offset: number = 0;
  itemsPerPage: number = 10;
  paramsSub: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe((params) => {
      this.type = params['type'];
    });
  }

  onVote(event: OnVoteEvent): void {
    this.vote(event.repoFullName, event.type);
  }

  fetchMore() {
    this.data.fetchMore({
      variables: {
        offset: this.offset + this.itemsPerPage,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.data) { return prev; }
        return Object.assign({}, prev, {
          feed: [...prev.feed, ...fetchMoreResult.data.feed],
        });
      },
    });
    this.offset += this.itemsPerPage;
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }
}
