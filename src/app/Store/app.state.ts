import { authReducer } from '../auth/state/auth.reducer';
import { auth } from '../auth/state/auth.selector';
import { AuthState } from '../auth/state/auth.state';
import { postsReducer } from '../posts/state/post.reducer';
import { PostsState } from '../posts/state/post.state';
import { SharedReducer } from './shared.reducer';
import { SHARED_STATE_NAME } from './shared.selector';
import { SharedState } from './shared.state';

// export interface AppState {
//   counter: CounterState;
//   posts: PostsState;
// }

export interface AppState {
  [SHARED_STATE_NAME]: SharedState;
  [auth.AUTH_STATE_NAME]: AuthState;
  ['posts']: PostsState
}
export const appReducer = {
  [SHARED_STATE_NAME]: SharedReducer,
  [auth.AUTH_STATE_NAME]: authReducer,
  ['posts']: postsReducer
};
