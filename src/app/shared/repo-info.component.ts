import { Component, OnInit, Input } from '@angular/core';
import { Angular2Apollo } from 'angular2-apollo';

import { commentQuery } from '../comments/comments-page.component';

@Component({
  selector: 'repo-info',
  template: `
    <p> {{ description | emojify }}</p>
    <p>
      <info-label
        label="Stars"
        [value]="stargazersCount">
      </info-label>
      &nbsp;
      <info-label
        label="Issues"
        [value]="openIssuesCount">
      </info-label>
      <span *ngIf="commentCount || commentCount === 0">
        &nbsp;
        <a [routerLink]="['/', org, repoName]" (mouseover)="prefetchComments(fullName)">
        View comments ({{ commentCount }})
        </a>
      </span>
      &nbsp;&nbsp;&nbsp;
      Submitted <!--{{ createdAt | amTimeAgo }}-->
      &nbsp;by&nbsp;
      <a [href]="userUrl">{{ username }}</a>
    </p>
  `
})
export class RepoInfoComponent implements OnInit {
  @Input() fullName: string;
  @Input() description: string;
  @Input() stargazersCount: number;
  @Input() openIssuesCount: number;
  @Input() createdAt: number;
  @Input() userUrl: string;
  @Input() username: string;
  @Input() commentCount: number;

  org: string;
  repoName: string;

  constructor(private apollo: Angular2Apollo) {}

  ngOnInit() {
    const parts = this.fullName.split('/');

    this.org = parts[0];
    this.repoName = parts[1];
  }

  prefetchComments(repoFullName: string) {
    console.log('on', repoFullName);
    this.apollo.query({
      query: commentQuery,
      variables: { repoName: repoFullName },
    });
  }
}
