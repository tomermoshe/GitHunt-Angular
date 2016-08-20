import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface OnVoteEvent {
  repoFullName: string;
  type: string;
}

@Component({
  selector: 'feed-entry',
  template: `
    <div class="media">
      <div class="media-vote">
        <vote-buttons
          [score]="entry.score"
          [vote]="entry.vote"
          [canVote]="!!currentUser"
          (onVote)="onButtonVote($event)">
        </vote-buttons>
      </div>
      <div class="media-left">
        <a href="#">
          <img
            class="media-object"
            style="width: 64px; height: 64px"
            [src]="entry.repository.owner.avatar_url"
          />
        </a>
      </div>
      <div class="media-body">
        <h4 class="media-heading">
          <a [href]="entry.repository.html_url">
            {{ entry.repository.full_name }}
          </a>
        </h4>
        <repo-info
          [fullName]="entry.repository.full_name"
          [description]="entry.repository.description"
          [stargazersCount]="entry.repository.stargazers_count"
          [openIssuesCount]="entry.repository.open_issues_count"
          [createdAt]="entry.createdAt"
          [userUrl]="entry.postedBy.html_url"
          [username]="entry.postedBy.login"
          [commentCount]="entry.commentCount">
        </repo-info>
      </div>
    </div>
  `
})
export class FeedEntryComponent implements OnInit {
  @Input() entry;
  @Input() currentUser;
  @Output() onVote: EventEmitter<OnVoteEvent> = new EventEmitter<OnVoteEvent>();
  org: string;
  repoName: string;

  ngOnInit() {
    const parts = this.entry.repository.full_name.split('/');

    this.org = parts[0];
    this.repoName = parts[1];
  }

  onButtonVote(type: string): void {
    this.onVote.emit({
      repoFullName: this.entry.repository.full_name,
      type,
    });
  }
}
