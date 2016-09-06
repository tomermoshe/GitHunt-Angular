import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <navigation></navigation>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {}
