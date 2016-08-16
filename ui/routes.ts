import { Routes,
    RouterModule } from '@angular/router';

import { Feed } from './Feed.ts';
import { Navigation } from './Navigation.ts';
import { NewEntry } from './NewEntry.ts';
import { CommentsPage } from './CommentsPage.ts';

export const routes: Routes = [
  { path: '', redirectTo: '/feed/top', pathMatch: 'full' },
  { path: 'feed/:type', component: Feed },
  { path: 'submit', component: NewEntry },
  { path: ':org/:repoName', component: CommentsPage },
];


