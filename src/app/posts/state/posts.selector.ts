import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './post.state';
import { Post } from 'src/app/Models/post.model';

export const getPostsState = createFeatureSelector<PostsState>('posts');
export const getPosts = createSelector(
  getPostsState,
  (state: { posts: Post[] }) => {
    return state.posts;
  }
);

export const getPostByID = createSelector(
  getPostsState,
  (state: any, props: any) => {
    console.log(props, "selector");
    return state.posts.find((post: { id: any; })=> post.id === props.id)
  }
);
