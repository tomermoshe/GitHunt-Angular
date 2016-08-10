import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Apollo } from 'angular2-apollo';

import { client } from './client.ts';

import gql from 'graphql-tag';

@Component({
  selector: 'profile',
  directives: [
    ROUTER_DIRECTIVES
  ],
  template: `
    <p *ngIf="data.loading" class="navbar-text navbar-right">
      Loading...
    </p>
    <span *ngIf="!data.loading && data.currentUser">
      <p class="navbar-text navbar-right">
        {{data.currentUser.login}}
        &nbsp;
        <a href="/logout">Log out</a>
      </p>
      <a
        class="btn navbar-btn navbar-right btn-success"
        routerLink="/submit">
        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
          &nbsp;
          Submit
      </a>
    </span>
    <p *ngIf="!data.loading && !data.currentUser" class="navbar-text navbar-right">
      <a href="/login/github">Log in with GitHub</a>
    </p>
  `
})
@Apollo({
  client,
  queries(context: Profile) {
    return {
      data: {
        query: gql`
          query CurrentUserForProfile {
            currentUser {
              login
              avatar_url
            }
          }
        `
      }
    };
  }
})
export class Profile {
  data: any;
}
