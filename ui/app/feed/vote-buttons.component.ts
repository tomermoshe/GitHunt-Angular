import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'vote-buttons',
  template: `
    <span>
      <button
        class="btn btn-score"
        [ngClass]="{active: vote.vote_value === 1}"
        (click)="voteUp()">
        <span class="glyphicon glyphicon-triangle-top" aria-hidden="true"></span>
      </button>
      <div class="vote-score">{{ score }}</div>
      <button
        class="btn btn-score"
        [ngClass]="{active: vote.vote_value === -1}"
        (click)="voteDown()">
        <span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
      </button>
      &nbsp;
    </span>
  `
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
