import { createReducer, on } from '@ngrx/store';
import { postsAdapter, postsInitialState } from './post.state';
import {
  addpostSuccess,
  deletePostSuccess,
  editPost,
  loadPosts,
  loadPostsSuccess,
  updatedPostsSuccess,
  viewPost,
} from './post.actions';

const _postsReducer = createReducer(
  postsInitialState,
  on(addpostSuccess, (state, action) => {
    return postsAdapter.addOne(action.post, state)
  }),
  // on(editPost, (state, action) => {
  //   const updatedposts = state.posts.map((post:Post) => {
  //     return action.post.id === post.id ? action.post : post;
  //   });
  //   return {
  //     ...state,
  //     posts: updatedposts,
  //   };
  // }),
  on(updatedPostsSuccess, (state, action) => {
    return postsAdapter.updateOne(action.post, state);
   }),
   
  on(deletePostSuccess, (state: any, { id }) => {
    return postsAdapter.removeOne(id, state)
  }),
  on(loadPostsSuccess, (state, action) => {
    return postsAdapter.addMany(action.posts, state);
  }),
  on(loadPosts, (state, action) => {
    return {
      ...state,
    };
  }),
  on(viewPost, (state,action)=>{
    console.log('viewPost called in reducer', action);
    return{
      ...state,
      modelBackdrop:action.modelBackdrop
    }
  })
);

export function postsReducer(state: any, action: any) {
  return _postsReducer(state, action);
}
