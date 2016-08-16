
import { NgModule }       from '@angular/core';
import { RouterModule }   from '@angular/router';
import { FormsModule }    from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { GitHunt }   from './githunt';
import {routes} from './routes';


@NgModule({
    declarations: [
        GitHunt
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