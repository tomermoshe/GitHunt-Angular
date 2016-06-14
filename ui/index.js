import 'reflect-metadata';
import 'zone.js/dist/zone';

import {
  Component
} from '@angular/core';

import {
  bootstrap
} from '@angular/platform-browser-dynamic';

import {
  Feed
} from './Feed';

import {
  Navigation
} from './Navigation';

import './style.css';

@Component({
  selector: 'git-hunt',
  directives: [
    Feed,
    Navigation
  ],
  template: `
  <div>
    <navigation></navigation>
    <div class="container">
      <feed></feed>
    </div>
  </div>
  `
})
class GitHunt {}

bootstrap(GitHunt);


(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-74643563-4', 'auto');
ga('send', 'pageview');
