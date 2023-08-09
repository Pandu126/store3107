import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostsService } from 'src/app/services/posts.service';
import {
  addNewPost,
  addpostSuccess,
  deletePost,
  deletePostSuccess,
  editPost,
  loadPosts,
  loadPostsSuccess,
  updatedPostsSuccess,
} from './post.actions';
import { map, mergeMap, switchMap } from 'rxjs/operators';

@Injectable()
export class postsEffects {
  constructor(private actins$: Actions, private postsService: PostsService) {}

  loadPosts$ = createEffect(() => {
    return this.actins$.pipe(
      ofType(loadPosts),
      mergeMap((action) => {
        return this.postsService.getPosts().pipe(
          map((posts) => {
            console.log(posts);
            return loadPostsSuccess({ posts: posts });
          })
        );
      })
    );
  });

  addPosts$ = createEffect(() => {
    return this.actins$.pipe(
      ofType(addNewPost),
      mergeMap((action) => {
        return this.postsService.addPosts(action.post).pipe(
          map((data) => {
            console.log(data);
            const post = { ...action.post, id: data.name };
            console.log(post);
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
        console.log(action.post)
        return this.postsService.updatePost(action.post).pipe(
          map((data) => {
            console.log(data);
            return updatedPostsSuccess({ post: action.post });
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
}
