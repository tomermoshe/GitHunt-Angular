import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Entry, User} from '../../schema-types';

export interface OnVoteEvent {
  repoFullName: string;
  type: string;
}

@Component({
  selector: 'feed-entry',
  templateUrl: 'feed-entry.component.html'
})
export class FeedEntryComponent {
  @Input()
  public entry: Entry;

  @Input()
  public currentUser: User;

  @Output()
  public onVote: EventEmitter<OnVoteEvent> = new EventEmitter<OnVoteEvent>();

  public onButtonVote(type: string): void {
    this.onVote.emit({
      repoFullName: this.entry.repository.full_name,
      type,
    });
  }
}
