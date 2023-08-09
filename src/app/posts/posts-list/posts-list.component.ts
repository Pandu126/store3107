import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/Models/post.model';
import { AppState } from 'src/app/Store/app.state';
import { getPostByID, getPosts } from '../state/posts.selector';
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
  displayedColumns: string[] = ['id', 'title', 'description', 'actions'];
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}
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
  }

  deletePost(id: any) {
    if (confirm('Are you sure you want to delete')) {
      console.log('delete the post');
    }
    this.store.dispatch(deletePost({ id }));
    this.router.navigate(['/posts']);
  }
  viewPost(id: string) {
    console.log('viewPost');
    this.viewPostId = id;
    this.store.dispatch(viewPost({ id, modelBackdrop: true }));
    this.store.select(getPostByID, { id: id }).subscribe((res) => {
      this.viewSinglePost = res;
      this.openModel = true;
    });
    this.editPostForm.setValue({
      title: this.viewSinglePost.title,
      description: this.viewSinglePost.description,
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
    this.router.navigate(['/posts']);
  }
  closeModel() {
    const id = this.viewPostId;
    this.store.dispatch(viewPost({ id, modelBackdrop: false }));
    this.openModel = false;
  }
}
