import { counterReducer } from '../Components/counter/state/counter.reducer';
import { CounterState } from '../Components/counter/state/counter.state';
import { postsReducer } from '../posts/state/post.reducer';
import { PostsState } from '../posts/state/post.state';

export interface AppState {
  counter: CounterState;
  posts: PostsState;
}

export const appReducer = {
  counter: counterReducer,
  posts: postsReducer,
};
