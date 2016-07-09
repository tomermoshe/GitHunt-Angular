import {
  Component,
  Input
} from '@angular/core';

import {
  RouteParams
} from '@angular/router-deprecated';

import {
  Apollo
} from 'angular2-apollo';

import gql from 'graphql-tag';

import {
  TimeAgoPipe
} from 'angular2-moment';

import {
  GraphQLResult
} from 'graphql';

import {
  client
} from './client.ts';

import {
  Loading
} from './Loading.ts';

@Component({
  selector: 'comment',
  pipes: [
    TimeAgoPipe
  ],
  template: `
    <div class="comment-box">
      <b>{{content}}</b>
      <br />
      Submitted {{ createdAt | amTimeAgo }} by <a [href]="userUrl">{{username}}</a>
    </div>
  `
})
class Comment {
  @Input() username: string;
  @Input() userUrl: string;
  @Input() content: string;
  @Input() createdAt: Date;
}

@Component({
  selector: 'comments-page',
  directives: [
    Loading,
    Comment
  ],
  template: `
  <loading *ngIf="data.loading"></loading>
  <div *ngIf="!data.loading">
    <div>
      <h1>Comments for <a [href]="data.entry.repository.html_url">{{data.entry.repository.full_name}}</a></h1>
      <form *ngIf="data.currentUser" (ngSubmit)="submitForm()">
          <div class="form-group">

            <input
              type="text"
              class="form-control"
              id="newComment"
              name="newCommentContent"
              [(ngModel)]="newComment"
              placeholder="Write your comment here!"
            />
          </div>

          <div *ngIf="submitComment.errors" class="alert alert-danger" role="alert">
            {{submitComment.errors[0].message}}
          </div>

          <div *ngIf="noCommentContent" class="alert alert-danger" role="alert">
            Comment must have content.
          </div>

          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
        <div *ngIf="!data.currentUser"><em>Log in to comment.</em></div>
      </div>
      <br />
      <div *ngIf="data.entry.comments">
        <comment
          *ngFor="let comment of data.entry.comments"
          [username]="comment.postedBy.login"
          [content]="comment.content"
          [createdAt]="comment.createdAt"
          [userUrl]="comment.postedBy.html_url">
        </comment>
      </div>
    </div>
  `
})
@Apollo({
  client,
  queries(context: CommentsPage) {
    return {
      data: {
        query: gql`
          query Comment($repoName: String!) {
            # Eventually move this into a no fetch query right on the entry
            # since we literally just need this info to determine whether to
            # show upvote/downvote buttons
            currentUser {
              login
              html_url
            }
            entry(repoFullName: $repoName) {
              comments {
                postedBy {
                  login
                  html_url
                }
                createdAt
                content
              }
              repository {
                full_name
                html_url
              }
            }
          }
        `,
        variables: {
          repoName: `${context.org}/${context.repoName}`,
        },
        forceFetch: true,
      },
    };
  },
  mutations(context: CommentsPage) {
    return {
      submitComment: (repoFullName: string, commentContent: string) => ({
        mutation: gql`
          mutation submitComment($repoFullName: String!, $commentContent: String!) {
            submitComment(repoFullName: $repoFullName, commentContent: $commentContent) {
              createdAt
            }
          }
        `,
        variables: {
          repoFullName,
          commentContent,
        },
      }),
    };
  },
})
export class CommentsPage {
  org: string;
  repoName: string;
  data: any;
  newComment: string;
  noCommentContent: boolean;
  submitComment: (repoFullName: string, commentContent: string) => Promise<GraphQLResult>;

  constructor(params: RouteParams) {
    this.org = params.get('org');
    this.repoName = params.get('repoName');
    this.noCommentContent = false;
  }

  submitForm() {
    this.noCommentContent = false;
    const repositoryName = this.data.entry.repository.full_name;
    if (!this.newComment) {
      this.noCommentContent = true;
    } else {
      this.submitComment(repositoryName, this.newComment).then((res) => {
        if (!res.errors) {
          this.newComment = '';
          this.data.refetch();
        }
      });
    }
  }
}
