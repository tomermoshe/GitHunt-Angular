import { Component, Input } from  '@angular/core';

@Component({
  selector: 'comment',
  templateUrl: 'comment.component.html'
})
export class CommentComponent {
  @Input() username: string;
  @Input() userUrl: string;
  @Input() content: string;
  @Input() createdAt: Date;
}
