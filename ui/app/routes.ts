import { RouterConfig, provideRouter } from '@angular/router';

import { FEED_ROUTES } from './feed';
import { COMMENTS_ROUTES } from './comments';
import { NewEntryComponent } from './new-entry.component';

export const routes: RouterConfig = [
  ...FEED_ROUTES,
  ...COMMENTS_ROUTES,
  { path: 'submit', component: NewEntryComponent }
];
