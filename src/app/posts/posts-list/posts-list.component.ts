import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Post } from 'src/app/Models/post.model';
import { AppState } from 'src/app/Store/app.state';
import { getCount, getPostByID, getPosts, getviewById } from '../state/posts.selector';
import { ActivatedRoute, Router } from '@angular/router';
import {
  deletePost,
  editPost,
  loadPosts,
  viewPost,
} from '../state/post.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent {
  posts!: Observable<Post[]>;
  dataSource!: Post[];
  id: any;
  viewPostId!: string;
  viewSinglePost!: Post;
  editPostForm!: FormGroup;
  openModel!: boolean;
  postsCount!: Observable<number>;
  postSubscription!: Subscription;
  displayedColumns: string[] = ['id', 'title', 'description', 'actions'];
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit() {
    this.route.paramMap.subscribe((dat) => {
      this.id = dat.get('id');
    });
    this.store.dispatch(loadPosts());
    this.posts = this.store.select(getPosts);
    this.posts.subscribe((data) => (this.dataSource = data));
    this.editPostForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
    this.postsCount = this.store.pipe(select(getCount))
  }

  deletePost(id: any) {
    if (confirm('Are you sure you want to delete')) {
      console.log('delete the post');
    }
    this.store.dispatch(deletePost({ id }));
    this.closeModel()
    this.router.navigate(['/posts']);
  }
  viewPost(id: string) {
    this.viewPostId = id;
    this.store.dispatch(viewPost({ id, modelBackdrop: true }));
    this.openModel = true;
    this.postSubscription = this.store.select(getviewById, { id }).subscribe((res: Post) => {
      console.log(res);
      this.viewSinglePost = res;
      this.editPostForm.setValue({
        title: this.viewSinglePost.title,
        description: this.viewSinglePost.description,
      });
    });
  }
  onEditPost() {
    const title = this.editPostForm.value.title;
    const description = this.editPostForm.value.description;
    let post: Post = {
      id: this.viewPostId,
      title,
      description,
    };
    this.store.dispatch(editPost({ post }));
    this.closeModel()
    this.router.navigate(['/posts']);
  }
  closeModel() {
    const id = this.viewPostId;
    this.openModel = false;
    this.store.dispatch(viewPost({ id, modelBackdrop: false }));
  }
  directToView(id: any) {
    this.router.navigate([`/posts/details/${id}`])
  }
  onDestroy() {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }
}
