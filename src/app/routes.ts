import { Routes } from '@angular/router';

import { FEED_ROUTES } from './components/feed';
import { COMMENTS_ROUTES } from './components/comments';
import { NewEntryComponent } from './components/new-entry.component';

export const routes: Routes = [
  ...FEED_ROUTES,
  ...COMMENTS_ROUTES,
  { path: 'submit', component: NewEntryComponent }
];
