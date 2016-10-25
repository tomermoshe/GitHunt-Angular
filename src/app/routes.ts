import {Routes} from '@angular/router';

import {FEED_ROUTES} from './feed';
import {COMMENTS_ROUTES} from './comments';
import {NewEntryComponent} from './new-entry/new-entry.component';

export const routes: Routes = [
  ...FEED_ROUTES,
  ...COMMENTS_ROUTES,
  {path: 'submit', component: NewEntryComponent}
];
