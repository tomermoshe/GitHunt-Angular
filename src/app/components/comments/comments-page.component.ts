import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Angular2Apollo, ApolloQueryObservable } from 'angular2-apollo';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

import gql from 'graphql-tag';

export const commentQuery = gql`
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
        id
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
const subscriptionQuery = gql`
  subscription onCommentAdded($repoFullName: String!){
    commentAdded(repoFullName: $repoFullName){
      id
      postedBy {
        login
        html_url
      }
      createdAt
      content
    }
  }
`;
const submitCommentMutation = gql`
  mutation submitComment($repoFullName: String!, $commentContent: String!) {
    submitComment(repoFullName: $repoFullName, commentContent: $commentContent) {
      id
      postedBy {
        login
        html_url
      }
      createdAt
      content
    }
  }
`;

// helper function checks for duplicate comments, which we receive because we
// get subscription updates for our own comments as well.
// TODO it's pretty inefficient to scan all the comments every time.
// maybe only scan the first 10, or up to a certain timestamp
function isDuplicateComment(newComment, existingComments) {
  return newComment.id !== null && existingComments.some(comment => newComment.id === comment.id);
}

@Component({
  selector: 'comments-page',
  templateUrl: 'comments-page.component.html'
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
  errors: any[];
  subscriptionRepoName: string;
  subscriptionSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private apollo: Angular2Apollo
  ) {
    this.noCommentContent = false;
  }

  ngOnInit() {
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

    this.paramsSub = this.route.params
      .subscribe(params => {
        const repoName = `${params['org']}/${params['repoName']}`;

        this.loading = true;
        this.repoName.next(repoName);

        // subscribe to comments
        if (this.subscriptionSub) {
          this.subscriptionSub.unsubscribe();
        }
        this.subscribe(repoName);
      });
  }

  submitForm() {
    this.noCommentContent = false;

    const repositoryName = this.entry.repository.full_name;

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
            id: null,
            postedBy: this.currentUser,
            createdAt: +new Date,
            content: this.newComment,
          },
        },
        updateQueries: {
          Comment: (prev, { mutationResult }) => {
            const newComment = mutationResult.data.submitComment;

            if (isDuplicateComment(newComment, prev.entry.comments)) {
              return prev;
            }

            const newEntry = Object.assign({}, prev.entry, {
              comments: [newComment, ...prev.entry.comments],
            });

            return Object.assign({}, prev, {
              entry: newEntry,
            });
          },
        },
      }).then(() => {
        this.newComment = '';
      }).catch(errors => {
        this.errors =  errors;
      });
    }
  }

  subscribe(repoName: string) {
    this.subscriptionRepoName = repoName;
    this.subscriptionSub = this.apollo.subscribe({
      query: subscriptionQuery,
      variables: { repoFullName: repoName },
    }).subscribe({
      next: (data) => {
        const newComment = data.commentAdded;

        this.entryObs.updateQuery((previousResult) => {
          if (isDuplicateComment(newComment, previousResult.entry.comments)) {
            return previousResult;
          }

          const newEntry = Object.assign({}, previousResult.entry, {
            comments: [newComment, ...previousResult.entry.comments],
          });

          return Object.assign({}, previousResult, {
            entry: newEntry,
          });
        });
      },
      error(err) {
        console.error('err', err);
      },
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    this.entrySub.unsubscribe();
    this.subscriptionSub.unsubscribe();
  }
}
