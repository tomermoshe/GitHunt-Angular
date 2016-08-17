
import { NgModule }       from '@angular/core';
import { RouterModule }   from '@angular/router';
import { FormsModule }    from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { TimeAgoPipe } from 'angular2-moment';

import { GitHunt }   from './githunt';
import { routes } from './routes';
import { CommentsPage } from './CommentsPage';
import { Feed } from './Feed';
import { Loading } from './Loading';
import { Navigation } from './Navigation';
import { NewEntry } from './NewEntry';
import { EmojifyPipe } from './pipes';
import { Profile } from './Profile';
import { RepoInfo } from './RepoInfo';

@NgModule({
    declarations: [
        GitHunt,
        CommentsPage,
        Feed,
        Loading,
        Navigation,
        NewEntry,
        EmojifyPipe,
        Profile,
        RepoInfo,
        TimeAgoPipe
    ],
    imports:      [
        BrowserModule,
        RouterModule.forRoot(routes),
        FormsModule,
    ],
    providers: [

    ],
    bootstrap: [GitHunt],
})
export class AppModule {}