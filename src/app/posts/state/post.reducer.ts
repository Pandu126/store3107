import { createReducer, on } from '@ngrx/store';
import { postsInitialState } from './post.state';
import { addNewPost, editPost } from './post.actions';

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
//   on(editPost, (state, action) => {
//     console.log(action, state);
//     let oldstate = {...state}
//     var foundIndex = oldstate.posts.findIndex(x => x.id == action.post.id);
//     console.log(oldstate.posts[foundIndex], action.post);
//     oldstate.posts[foundIndex] = action.post;
// // items[foundIndex] = item;
//     return {
//         ...state,
//         oldstate
//     };
//   })
);

export function postsReducer(state: any, action: any) {
  return _postsReducer(state, action);
}
