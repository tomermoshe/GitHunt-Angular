import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface OnVoteEvent {
  repoFullName: string;
  type: string;
}

@Component({
  selector: 'feed-entry',
  templateUrl: './feed-entry.component.html'
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
