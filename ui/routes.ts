import { RouterConfig, provideRouter } from '@angular/router';

import { Feed } from './Feed.ts';
import { Navigation } from './Navigation.ts';
import { NewEntry } from './NewEntry.ts';
import { CommentsPage } from './CommentsPage.ts';

const routes: RouterConfig = [
  { path: '', redirectTo: '/feed/top', pathMatch: 'full' },
  { path: 'feed/:type', component: Feed },
  { path: 'submit', component: NewEntry },
  { path: ':org/:repoName', component: CommentsPage },
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
