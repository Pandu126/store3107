import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Post } from 'src/app/Models/post.model';

export interface PostsState extends EntityState<Post> {}

export const postsAdapter = createEntityAdapter<Post>();
export const postsInitialState: PostsState = postsAdapter.getInitialState();