import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Post } from 'src/app/Models/post.model';

export enum postsEnum {
  ADD_POST_ACTION = '[posts page] add post',
  ADD_POST_SUCCESS = '[posts page] add post success',
  UPDATE_POST_ACTION = '[posts page] edit post',
  UPDATE_POST_SUCCESS = '[posts page] edit post success',
  DELETE_POST_ACTION = '[posts page] delete post',
  DELETE_POST_SUCCESS = '[posts page] delete post success',
  LOAD_POSTS = '[posts page] load posts',
  LOAD_POSTS_SUCCESS = '[posts page] load posts success',
  VIEW_POST = '[posts page] view post',
}

export const addNewPost = createAction(
  postsEnum.ADD_POST_ACTION,
  props<{ post: Post }>()
);

export const editPost = createAction(
  postsEnum.UPDATE_POST_ACTION,
  props<{ post: Post }>()
);

export const deletePost = createAction(
  postsEnum.DELETE_POST_ACTION,
  props<{ id: any }>()
);
export const deletePostSuccess = createAction(
  postsEnum.DELETE_POST_SUCCESS,
  props<{ id: any }>()
);

export const loadPosts = createAction(postsEnum.LOAD_POSTS);
export const loadPostsSuccess = createAction(
  postsEnum.LOAD_POSTS_SUCCESS,
  props<{ posts: Post[] }>()
);
export const addpostSuccess = createAction(
  postsEnum.ADD_POST_SUCCESS,
  props<{ post: Post }>()
);

export const updatedPostsSuccess = createAction(
  postsEnum.UPDATE_POST_SUCCESS,
  props<{ post: Update<Post>, redirect:boolean }>()
);

export const viewPost = createAction(
  postsEnum.VIEW_POST,
  props<{ id: string; modelBackdrop: boolean }>()
);