import { CounterState } from '../Components/counter/state/counter.state';
import { authReducer } from '../auth/state/auth.reducer';
import { auth } from '../auth/state/auth.selector';
import { AuthState } from '../auth/state/auth.state';
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
}
export const appReducer = {
  [SHARED_STATE_NAME]: SharedReducer,
  [auth.AUTH_STATE_NAME]: authReducer,
};
