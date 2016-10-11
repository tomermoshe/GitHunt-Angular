import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'vote-buttons',
  templateUrl: 'vote-buttons.component.html'
})
export class VoteButtonsComponent {
  @Input() canVote: boolean;
  @Input() score: number;
  @Input() vote: any;
  @Output() onVote: EventEmitter<string> = new EventEmitter<string>();

  public voteUp(): void {
    this.submitVote('UP');
  }

  public voteDown(): void {
    this.submitVote('DOWN');
  }

  private submitVote(type: string): void {
    if (this.canVote === true) {
      const voteValue = {
        UP: 1,
        DOWN: -1,
      }[type];

      this.onVote.emit(this.vote.vote_value === voteValue ? 'CANCEL' : type);
    }
  }
}
