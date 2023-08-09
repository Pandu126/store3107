import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './post.state';
import { Post } from 'src/app/Models/post.model';
import { getCurrentRoute } from 'src/app/router/router.selector';
import { RouterStateUrl } from 'src/app/router/custom-serializer';

export const getPostsState = createFeatureSelector<PostsState>('posts');
export const getPosts = createSelector(
  getPostsState,
  (state: { posts: Post[] }) => {
    return state.posts;
  }
);

export const getPostByID = createSelector(
  getPosts,
  getCurrentRoute,
  (posts: any, route: RouterStateUrl) => {
    return posts
      ? posts.find((post: { id: any }) => post.id === route.params['id'])
      : null;
  }
);
export const modelwindow = createSelector(getPostsState, (state: any) => {
  console.log(state);
  return state.modelBackdrop;
});
