import {Component, Input, Output, EventEmitter} from '@angular/core';
import {VoteType} from '../../../schema-types';

@Component({
  selector: 'vote-buttons',
  templateUrl: 'vote-buttons.component.html'
})
export class VoteButtonsComponent {
  @Input()
  public canVote: boolean;

  @Input()
  public score: number;

  @Input()
  public vote: any;

  @Output()
  public onVote: EventEmitter<string> = new EventEmitter<string>();

  public voteUp(): void {
    this.submitVote('UP');
  }

  public voteDown(): void {
    this.submitVote('DOWN');
  }

  private submitVote(type: string): void {
    if (this.canVote === true) {
      const voteValue: VoteType = {
        UP: 1,
        DOWN: -1,
      }[type];

      this.onVote.emit(this.vote.vote_value === voteValue ? 'CANCEL' : type);
    }
  }
}
