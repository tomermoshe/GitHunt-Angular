import { Routes } from '@angular/router';

import { FeedComponent } from './feed.component';
import { FeedEntryComponent } from './feed-entry.component';
import { VoteButtonsComponent } from './vote-buttons.component';

export const FEED_DECLARATIONS = [
  FeedComponent,
  FeedEntryComponent,
  VoteButtonsComponent
];

export const FEED_ROUTES: Routes = [
  { path: '', redirectTo: '/feed/top', pathMatch: 'full' },
  { path: 'feed/:type', component: FeedComponent }
];
