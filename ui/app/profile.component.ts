import { Component } from '@angular/core';

import gql from 'graphql-tag';

import GraphQL from './graphql';

const CurrentUserQuery = gql`
  query CurrentUserForProfile {
    currentUser {
      login
      avatar_url
    }
  }
`;

@Component({
  selector: 'profile',
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
@GraphQL({
  queries() {
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
export class ProfileComponent {
  data: any;
}
