import { Post } from 'src/app/Models/post.model';

export const postsInitialState: PostsState = {
  posts: [],
  modelBackdrop:false
};

export interface PostsState {
  posts: Post[];
  modelBackdrop:boolean;
}