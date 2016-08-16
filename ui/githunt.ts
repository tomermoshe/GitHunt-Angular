import { Component } from '@angular/core';

import { Navigation } from './Navigation.ts';

@Component({
    selector: 'git-hunt',
    directives: [
        Navigation
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
export class GitHunt {}
