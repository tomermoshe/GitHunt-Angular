import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Angular2Apollo, ApolloQueryObservable } from 'angular2-apollo';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

import gql from 'graphql-tag';

const commentQuery = gql`
  query Comment($repoName: String!) {
    # Eventually move this into a no fetch query right on the entry
    # since we literally just need this info to determine whether to
    # show upvote/downvote buttons
    currentUser {
      login
      html_url
    }
    entry(repoFullName: $repoName) {
      id
      postedBy {
        login
        html_url
      }
      createdAt
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
        description
        open_issues_count
        stargazers_count
      }
    }
  }
`;
const submitCommentMutation = gql`
  mutation submitComment($repoFullName: String!, $commentContent: String!) {
    submitComment(repoFullName: $repoFullName, commentContent: $commentContent) {
      postedBy {
        login
        html_url
      }
      createdAt
      content
    }
  }
`;

@Component({
  selector: 'comments-page',
  template: `
  <loading *ngIf="loading"></loading>
  <div *ngIf="!loading">
    <div>
      <h1>Comments for <a [href]="entry.repository.html_url">{{entry.repository.full_name}}</a></h1>
      <repo-info
        [fullName]="entry.repository.full_name"
        [description]="entry.repository.description"
        [stargazersCount]="entry.repository.stargazers_count"
        [openIssuesCount]="entry.repository.open_issues_count"
        [createdAt]="entry.createdAt"
        [userUrl]="entry.postedBy.html_url"
        [username]="entry.postedBy.login"
        [commentCount]="entry.commentCount">
      </repo-info>
      <form *ngIf="currentUser" (ngSubmit)="submitForm()">
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
        <div *ngIf="!currentUser"><em>Log in to comment.</em></div>
      </div>
      <br />
      <div *ngIf="entry.comments">
        <comment
          *ngFor="let comment of entry.comments"
          [username]="comment.postedBy.login"
          [content]="comment.content"
          [createdAt]="comment.createdAt"
          [userUrl]="comment.postedBy.html_url">
        </comment>
      </div>
    </div>
  `
})
export class CommentsPageComponent implements OnInit, OnDestroy {
  newComment: string;
  noCommentContent: boolean;
  entry: any;
  currentUser: any;
  loading: boolean = true;
  repoName: Subject<string> = new Subject<string>();
  paramsSub: Subscription;
  entryObs: ApolloQueryObservable<any>;
  entrySub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private apollo: Angular2Apollo
  ) {
    this.noCommentContent = false;
  }

  ngOnInit() {
    this.paramsSub = this.route.params
      .subscribe(params => {
        this.loading = true;
        this.repoName.next(`${params['org']}/${params['repoName']}`);
      });

    this.entryObs = this.apollo.watchQuery({
      query: commentQuery,
      variables: {
        repoName: this.repoName,
      },
    });

    this.entrySub = this.entryObs.subscribe(({data, loading}) => {
      this.entry = data.entry;
      this.currentUser = data.currentUser;
      this.loading = loading;
    });
  }

  submitForm() {
    this.noCommentContent = false;

    const repositoryName = this.entry.repository.full_name;
    const repoId = this.entry.id;

    if (!this.newComment) {
      this.noCommentContent = true;
    } else {
      this.apollo.mutate({
        mutation: submitCommentMutation,
        variables: {
          repoFullName: repositoryName,
          commentContent: this.newComment,
        },
        optimisticResponse: {
         __typename: 'Mutation',
         submitComment: {
           __typename: 'Comment',
           postedBy: this.currentUser,
           createdAt: +new Date,
           content: this.newComment,
         },
       },
       resultBehaviors: [
         {
           type: 'ARRAY_INSERT',
           resultPath: [ 'submitComment' ],
           storePath: [ 'Entry' + repoId, 'comments' ],
           where: 'PREPEND',
         },
       ],
      }).then(() => {
        this.newComment = '';
      });
    }
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    this.entrySub.unsubscribe();
  }
}
