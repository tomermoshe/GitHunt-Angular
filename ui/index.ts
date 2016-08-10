import 'es6-shim';
import 'reflect-metadata';
import 'zone.js/dist/zone';

import { Component } from '@angular/core';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { bootstrap } from '@angular/platform-browser-dynamic';

import { APP_ROUTER_PROVIDERS } from './routes.ts';
import { Navigation } from './Navigation.ts';

import './style.css';

@Component({
  selector: 'git-hunt',
  directives: [
    Navigation,
    ROUTER_DIRECTIVES
  ],
  template: `
    <div>
      <navigation></navigation>
      <div class="container">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
class GitHunt {}

bootstrap(GitHunt, [
  APP_ROUTER_PROVIDERS,
  disableDeprecatedForms(),
  provideForms()
]).catch((error) => {
  console.log('error', error);
});
