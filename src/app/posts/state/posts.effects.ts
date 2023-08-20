import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostsService } from 'src/app/services/posts.service';
import {
  addNewPost,
  addpostSuccess,
  deletePost,
  deletePostSuccess,
  dummyAction,
  editPost,
  loadPosts,
  loadPostsSuccess,
  updatedPostsSuccess,
} from './post.actions';
import { filter, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Post } from 'src/app/Models/post.model';
import { Update } from '@ngrx/entity';
import { Router } from '@angular/router';
import { ROUTER_NAVIGATION, RouterNavigatedAction } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { getPosts } from './posts.selector';
import { of } from 'rxjs';

@Injectable()
export class postsEffects {
  constructor(
    private actins$: Actions,
    private postsService: PostsService,
    private router: Router,
    private store: Store
  ) { }

  loadPosts$ = createEffect(() => {
    return this.actins$.pipe(
      ofType(loadPosts),
      withLatestFrom(this.store.select(getPosts)),
      mergeMap(([action, post]) => {
        if (!post.length || post.length === 1) {
          return this.postsService.getPosts().pipe(
            map((posts) => {
              return loadPostsSuccess({ posts: posts });
            })
          );
        }
        return of(dummyAction());
      })
    );
  });

  addPosts$ = createEffect(() => {
    return this.actins$.pipe(
      ofType(addNewPost),
      mergeMap((action) => {
        return this.postsService.addPosts(action.post).pipe(
          map((data) => {
            const post = { ...action.post, id: data.name };
            return addpostSuccess({ post: post });
          })
        );
      })
    );
  });
  updatePost$ = createEffect(() => {
    return this.actins$.pipe(
      ofType(editPost),
      switchMap((action) => {
        return this.postsService.updatePost(action.post).pipe(
          map((data) => {
            const id = action.post.id;
            const updatedPost: Update<Post> = {
              id: id,
              changes: { ...action.post },
            };
            return updatedPostsSuccess({ post: updatedPost, redirect: true });
          })
        );
      })
    );
  });
  deletePost$ = createEffect(() => {
    return this.actins$.pipe(
      ofType(deletePost),
      switchMap((action) => {
        return this.postsService.deletePost(action.id).pipe(
          map((data) => {
            return deletePostSuccess({ id: action.id });
          })
        );
      })
    );
  });

  updatePostRedirect$ = createEffect(
    () => {
      return this.actins$.pipe(
        ofType(updatedPostsSuccess),
        tap((action) => {
          if (action.redirect) {
            this.router.navigate(['/posts']);
          }
        })
      );
    },
    { dispatch: false }
  );

  getSinglePost$ = createEffect(() => {
    return this.actins$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigatedAction) => {
        return r.payload.routerState.url.startsWith('/posts/details');
      }),
      map((r: any) => {
        return r.payload.routerState['params']['id'];
      }),
      withLatestFrom(this.store.select(getPosts)),
      switchMap(([id, posts]) => {
        if (!posts.length) {
          return this.postsService.getPostId(id).pipe(
            map((post) => {
              const postData = [{ ...post, id }];
              return loadPostsSuccess({ posts: postData });
            })
          );
        }
        return of(dummyAction())
      })
    );
  });
}
