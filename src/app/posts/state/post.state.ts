import { Post } from 'src/app/Models/post.model';

export const postsInitialState: PostsState = {
  posts: [
    { id: '1', title: 'Sample title 1', description: ' Sample Description 1' },
    { id: '2', title: 'Sample title 2', description: ' Sample Description 2' },
  ],
};

export interface PostsState {
  posts: Post[];
}
