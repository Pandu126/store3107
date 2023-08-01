import { createReducer, on } from '@ngrx/store';
import { postsInitialState } from './post.state';
import { addNewPost, deletePost, editPost } from './post.actions';

const _postsReducer = createReducer(
  postsInitialState,
  on(addNewPost, (state, action) => {
    let posts = { ...action.post };
    posts.id = (state.posts.length + 1).toString();
    return {
      ...state,
      posts: [...state.posts, posts],
    };
  }),
  on(editPost, (state, action) => {
    const updatedposts = state.posts.map((post) => {
      return action.post.id === post.id ? action.post : post;
    });
    return {
      ...state,
      posts: updatedposts,
    };
  }),
  on(deletePost, (state: any, { id }) => {
    const updatedPosts = state.posts.filter((post: { id: any }) => {
      return post.id !== id;
    });
    console.log(id, state, updatedPosts);
    return {
      ...state,
      posts: updatedPosts,
    };
  })
);

export function postsReducer(state: any, action: any) {
  return _postsReducer(state, action);
}
