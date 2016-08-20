import { Component, OnInit, Input } from '@angular/core';

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
        <a [routerLink]="['/', org, repoName]">
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

  ngOnInit() {
    const parts = this.fullName.split('/');

    this.org = parts[0];
    this.repoName = parts[1];
  }
}
