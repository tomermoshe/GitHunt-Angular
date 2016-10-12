import {Component, OnInit, Input} from '@angular/core';
import {Angular2Apollo} from 'angular2-apollo';

import {commentQuery} from '../comments/comments-page.model';

@Component({
  selector: 'repo-info',
  templateUrl: 'repo-info.component.html'
})
export class RepoInfoComponent implements OnInit {
  @Input()
  public fullName: string;
  @Input()
  public description: string;
  @Input()
  public stargazersCount: number;
  @Input()
  public openIssuesCount: number;
  @Input()
  public createdAt: number;
  @Input()
  public userUrl: string;
  @Input()
  public username: string;
  @Input()
  public commentCount: number;

  public org: string;
  public repoName: string;

  constructor(private apollo: Angular2Apollo) {
  }

  public ngOnInit() {
    const parts = this.fullName.split('/');

    this.org = parts[0];
    this.repoName = parts[1];
  }

  public prefetchComments(repoFullName: string) {
    console.log('on', repoFullName);
    this.apollo.query({
      query: commentQuery,
      variables: {repoName: repoFullName},
    });
  }
}
