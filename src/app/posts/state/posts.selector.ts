import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState, postsAdapter } from './post.state';


export const getPostsState = createFeatureSelector<PostsState>('posts');
export const postSelectors = postsAdapter.getSelectors();
export const getPosts = createSelector(getPostsState, postSelectors.selectAll);

export const getPostByID = createSelector(
  getPosts,
  (state: any, props: any) => {
    return state.posts ? state.posts[props.id] : null;
  }
);
export const modelwindow = createSelector(getPostsState, (state: any) => {
  console.log(state);
  return state.modelBackdrop;
});
