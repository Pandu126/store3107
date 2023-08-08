import { Post } from 'src/app/Models/post.model';

export const postsInitialState: PostsState = {
  posts: [],
};

export interface PostsState {
  posts: Post[];
}