import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getPostByID } from '../state/posts.selector';
import { ActivatedRoute, Router } from '@angular/router';
import { editPost } from '../state/post.actions';
import { Post } from 'src/app/Models/post.model';
import { AppState } from 'src/app/Store/app.state';
import { Subscription } from 'rxjs';

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
  constructor(private store: Store<AppState>) {}
  ngOnInit() {
    this.createForm();
    this.postSubscription = this.store.select(getPostByID).subscribe((post) => {
      if(post){
      this.post = post;
      this.editPostForm.patchValue({
        title: post.title,
        description: post.description,
      });}
    });
  }

  createForm() {
    this.editPostForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
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
  }
  ngOnDestroy() {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }
}
