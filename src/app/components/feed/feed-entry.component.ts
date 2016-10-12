import {Component, Input, Output, EventEmitter} from '@angular/core';

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
  public entry;
  @Input()
  public currentUser;
  @Output()
  public onVote: EventEmitter<OnVoteEvent> = new EventEmitter<OnVoteEvent>();

  public onButtonVote(type: string): void {
    this.onVote.emit({
      repoFullName: this.entry.repository.full_name,
      type,
    });
  }
}
