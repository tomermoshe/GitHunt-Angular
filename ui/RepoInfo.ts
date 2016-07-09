import {
  Component,
  Input
} from '@angular/core';

import {
  RouterLink
} from '@angular/router-deprecated';

import {
  TimeAgoPipe
} from 'angular2-moment';

import {
  EmojifyPipe
} from './pipes.ts';

@Component({
  selector: 'info-label',
  template: `
    <span class="label label-info">{{ label }}: {{ value }}</span>
  `
})
class InfoLabel {
  @Input() label;
  @Input() value;
}

@Component({
  selector: 'repo-info',
  directives: [
    InfoLabel,
    RouterLink
  ],
  pipes: [
    EmojifyPipe,
    TimeAgoPipe
  ],
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
        <a [routerLink]="['Comments', { org: org, repoName: repoName }]">
        View comments ({{ commentCount }})
        </a>
      </span>
      &nbsp;&nbsp;&nbsp;
      Submitted {{ createdAt | amTimeAgo }}
      &nbsp;by&nbsp;
      <a [href]="userUrl">{{ username }}</a>
    </p>
  `
})
export class RepoInfo {
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
