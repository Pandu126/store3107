import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Post } from 'src/app/Models/post.model';

export interface PostsState extends EntityState<Post> {
    count: number;
    loading: boolean;
}

export const postsAdapter = createEntityAdapter<Post>({
    selectId: (post: Post) => post.id,
    sortComparer: sortByName
});
export const postsInitialState: PostsState = postsAdapter.getInitialState({
    count: 0,
    loading: false,
});

export function sortByName(a: Post, b: Post): number {
    const compare = a.title.localeCompare(b.title);
    //localeCompare with return the 1,0,-1 based on the equality if the both the elements equal that returns 0, if first element is greater will return 1, for second element is greater it will return the -1
    if (compare > 0) {
        return -1;
    }
    if (compare < 0) {
        return 1;
    }
    return compare;
}