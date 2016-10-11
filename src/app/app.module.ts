import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApolloModule } from 'angular2-apollo';
import { TimeAgoPipe } from 'angular2-moment';

import { AppComponent } from './components/app.component';
import { NavigationComponent } from './components/navigation.component';
import { ProfileComponent } from './components/profile.component';
import { NewEntryComponent } from './components/new-entry.component';
import { FEED_DECLARATIONS } from './components/feed';
import { COMMENTS_DECLARATIONS } from './components/comments';
import { SHARED_DECLARATIONS } from './components/shared';
import { routes } from './routes';
import { client } from './client';

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
    RouterModule.forRoot(routes),
    ApolloModule.withClient(client)
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
