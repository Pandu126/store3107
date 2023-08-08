import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getPostByID } from '../state/posts.selector';
import { ActivatedRoute, Router } from '@angular/router';
import { editPost } from '../state/post.actions';
import { Post } from 'src/app/Models/post.model';
import { AppState } from 'src/app/Store/app.state';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit, OnDestroy {
  editPostForm!: FormGroup;
  post!: any;
  editedPost!: Post;
  id!: any;
  postSubscription!: Subscription;
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.postSubscription = this.route.paramMap.subscribe((dat) => {
      this.id = dat.get('id');
      this.store.select(getPostByID, { id: this.id }).subscribe((data) => {
        this.post = data;
        this.editPostForm = new FormGroup({
          title: new FormControl(this.post.title, [
            Validators.required,
            Validators.minLength(6),
          ]),
          description: new FormControl(this.post.description, [
            Validators.required,
            Validators.minLength(10),
          ]),
        });
      });
    });
  }

  onEditPost() {
    const title = this.editPostForm.value.title;
    const description = this.editPostForm.value.description;
    let post: Post = {
      id: this.id,
      title,
      description,
    };
    this.store.dispatch(editPost({ post }));
    this.router.navigate(['/posts']);
  }
  ngOnDestroy() {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }
}
