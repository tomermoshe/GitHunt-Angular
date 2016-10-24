import {Routes} from '@angular/router';

import {CommentComponent} from './comment.component';
import {CommentsPageComponent} from './comments-page.component';
import {Component} from '@angular/core';

export const COMMENTS_DECLARATIONS: Component[] = [
  CommentComponent,
  CommentsPageComponent
];

export const COMMENTS_ROUTES: Routes = [
  {path: ':org/:repoName', component: CommentsPageComponent}
];
