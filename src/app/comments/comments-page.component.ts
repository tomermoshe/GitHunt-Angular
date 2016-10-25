import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Angular2Apollo, ApolloQueryObservable} from 'angular2-apollo';
import {Subscription} from 'rxjs/Subscription';
import {Subject} from 'rxjs/Subject';
import {commentQuery, submitCommentMutation, subscriptionQuery} from './comments-page.model';
import {Comment} from '../../schema-types';

// helper function checks for duplicate comments, which we receive because we
// get subscription updates for our own comments as well.
// TODO it's pretty inefficient to scan all the comments every time.
// maybe only scan the first 10, or up to a certain timestamp
function isDuplicateComment(newComment: Comment, existingComments: Comment[]): boolean {
  return newComment.id !== null && existingComments.some(comment => newComment.id === comment.id);
}

@Component({
  selector: 'comments-page',
  templateUrl: 'comments-page.component.html'
})
export class CommentsPageComponent implements OnInit, OnDestroy {
  public newComment: Comment;
  public noCommentContent: boolean;
  public entry: any;
  public currentUser: any;
  public loading: boolean = true;
  public errors: any[];

  private repoName: Subject<string> = new Subject<string>();
  private paramsSub: Subscription;
  private entryObs: ApolloQueryObservable<any>;
  private entrySub: Subscription;
  private subscriptionRepoName: string;
  private subscriptionSub: Subscription;

  constructor(private route: ActivatedRoute,
              private apollo: Angular2Apollo) {
    this.noCommentContent = false;
  }

  public ngOnInit(): void {
    this.entryObs = this.apollo.watchQuery({
      query: commentQuery,
      variables: {
        repoFullName: this.repoName,
      },
    });

    this.entrySub = this.entryObs.subscribe(({data, loading}) => {
      this.entry = data.entry;
      this.currentUser = data.currentUser;
      this.loading = loading;
    });

    this.paramsSub = this.route.params
      .subscribe(params => {
        const repoName: string = `${params['org']}/${params['repoName']}`;

        this.loading = true;
        this.repoName.next(repoName);

        // subscribe to comments
        if (this.subscriptionSub) {
          this.subscriptionSub.unsubscribe();
        }
        this.subscribe(repoName);
      });
  }

  public submitForm(): void {
    this.noCommentContent = false;

    const repositoryName: string = this.entry.repository.full_name;

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
          }
        },
        updateQueries: {
          Comment: (prev, {mutationResult}) => {
            const newComment: Comment = mutationResult.data.submitComment;

            if (isDuplicateComment(newComment, prev.entry.comments)) {
              return prev;
            }

            const newEntry: Comment[] = Object.assign({}, prev.entry, {
              comments: [newComment, ...prev.entry.comments],
            });

            return Object.assign({}, prev, {
              entry: newEntry,
            });
          }
        }
      })
        .then(() => this.newComment = null)
        .catch(errors => this.errors = errors);
    }
  }

  public ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
    this.entrySub.unsubscribe();
    this.subscriptionSub.unsubscribe();
  }

  private subscribe(repoName: string): void {
    this.subscriptionRepoName = repoName;
    this.subscriptionSub = this.apollo.subscribe({
      query: subscriptionQuery,
      variables: {repoFullName: repoName},
    }).subscribe({
      next: (data) => {
        const newComment: Comment = data.commentAdded;

        this.entryObs.updateQuery((previousResult) => {
          if (isDuplicateComment(newComment, previousResult.entry.comments)) {
            return previousResult;
          }

          const newEntry: Comment[] = Object.assign({}, previousResult.entry, {
            comments: [newComment, ...previousResult.entry.comments],
          });

          return Object.assign({}, previousResult, {
            entry: newEntry,
          });
        });
      },
      error(err: any): void {
        console.error('err', err);
      }
    });
  }

}
