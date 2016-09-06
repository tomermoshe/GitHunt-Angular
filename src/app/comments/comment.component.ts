import { Component, Input } from  '@angular/core';

@Component({
  selector: 'comment',
  template: `
    <div class="comment-box">
      <b>{{content | emojify}}</b>
      <br />
      Submitted <!-- issue {{createdAt | amTimeAgo}} --> by <a [href]="userUrl">{{username}}</a>
    </div>
  `
})
export class CommentComponent {
  @Input() username: string;
  @Input() userUrl: string;
  @Input() content: string;
  @Input() createdAt: Date;
}
