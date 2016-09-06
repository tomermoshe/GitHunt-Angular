import { Routes } from '@angular/router';

import { CommentComponent } from './comment.component';
import { CommentsPageComponent } from './comments-page.component';

export const COMMENTS_DECLARATIONS = [
  CommentComponent,
  CommentsPageComponent
];

export const COMMENTS_ROUTES: Routes = [
  { path: ':org/:repoName', component: CommentsPageComponent }
];
