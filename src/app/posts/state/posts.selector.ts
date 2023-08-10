import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState, postsAdapter } from './post.state';
import { getCurrentRoute } from 'src/app/router/router.selector';
import { RouterStateUrl } from 'src/app/router/custom-serializer';

export const getPostsState = createFeatureSelector<PostsState>('posts');
export const postSelectors = postsAdapter.getSelectors();
export const getPosts = createSelector(getPostsState, postSelectors.selectAll);
export const getPostEntities = createSelector(
  getPostsState,
  postSelectors.selectEntities
);

export const getPostByID = createSelector(
  getPostEntities,
  getCurrentRoute,
  (state: any, route: RouterStateUrl) => {
    console.log(state, route.params['id'], "called 2");
    return state ? state[route.params['id']] : null;
  }
);
export const modelwindow = createSelector(getPostsState, (state: any) => {
  console.log(state);
  return state.modelBackdrop;
});
