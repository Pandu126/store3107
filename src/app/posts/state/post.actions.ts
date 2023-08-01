import { createAction, props } from '@ngrx/store';
import { Post } from 'src/app/Models/post.model';

export enum postsEnum {
  ADD_POST_ACTION = '[posts page] add post',
  UPDATE_POST_ACTION = '[posts page] edit post',
  DELETE_POST_ACTION = '[posts page] delete post',
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
  props<{id: any}>()
);
