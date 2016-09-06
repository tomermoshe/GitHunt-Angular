import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TimeAgoPipe } from 'angular2-moment';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation.component';
import { ProfileComponent } from './profile.component';
import { NewEntryComponent } from './new-entry.component';
import { FEED_DECLARATIONS } from './feed';
import { COMMENTS_DECLARATIONS } from './comments';
import { SHARED_DECLARATIONS } from './shared';
import { routes } from './routes';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ProfileComponent,
    NewEntryComponent,
    ...FEED_DECLARATIONS,
    ...COMMENTS_DECLARATIONS,
    ...SHARED_DECLARATIONS,
    TimeAgoPipe
  ],
  entryComponents: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
