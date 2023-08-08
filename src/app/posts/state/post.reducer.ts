import { createReducer, on } from '@ngrx/store';
import { postsInitialState } from './post.state';
import {
  addpostSuccess,
  deletePost,
  deletePostSuccess,
  editPost,
  loadPosts,
  loadPostsSuccess,
} from './post.actions';
import { Post } from 'src/app/Models/post.model';

const _postsReducer = createReducer(
  postsInitialState,
  on(addpostSuccess, (state, action) => {
    let posts = { ...action.post };
    return {
      ...state,
      posts: [...state.posts, posts],
    };
  }),
  on(editPost, (state, action) => {
    const updatedposts = state.posts.map((post:Post) => {
      return action.post.id === post.id ? action.post : post;
    });
    return {
      ...state,
      posts: updatedposts,
    };
  }),
  on(deletePostSuccess, (state: any, { id }) => {
    const updatedPosts = state.posts.filter((post: { id: any }) => {
      return post.id !== id;
    });
    return {
      ...state,
      posts: updatedPosts,
    };
  }),
  on(loadPostsSuccess, (state, action) => {
    return {
      ...state,
      posts: action.posts,
    };
  }),
  on(loadPosts, (state, action) => {
    return {
      ...state,
    };
  })
);

export function postsReducer(state: any, action: any) {
  return _postsReducer(state, action);
}
