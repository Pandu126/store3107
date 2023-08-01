import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getPostByID, getPosts } from '../state/posts.selector';
import { ActivatedRoute, Router } from '@angular/router';
import { editPost } from '../state/post.actions';
import { Post } from 'src/app/Models/post.model';
import { AppState } from 'src/app/Store/app.state';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit {
  editPostForm!: FormGroup;
  post!: any;
  editedPost!: Post;
  id!: any;
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
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

    this.route.paramMap.subscribe((dat) => {
      console.log(dat.get('id'));
      let id = dat.get('id');
      this.store.select(getPostByID, { id }).subscribe((data) => {
        this.post = data;
      console.log(this.post);
      });
    });
    let values;
    this.route.url.subscribe((data) => {
      this.store.select(getPosts).subscribe((data) => {
        this.id = this.route.snapshot.params['id'];
        values = data;
        this.post = values.filter((data) => {
          return this.id == data.id;
        });
        this.editedPost = {
          title: this.post[0].title,
          description: this.post[0].description,
        };
        this.editPostForm.patchValue(this.editedPost);
      });
      this.editPostForm.patchValue(this.editedPost);
    });
  }

  onEditPost() {
    let formValue = this.editPostForm.value;
    console.log(this.id);
    this.id = this.id.toString();
    console.log(this.id);
    let finalvalue: Post = {
      id: this.id,
      title: formValue.title,
      description: formValue.description,
    };
    this.store.dispatch(editPost({ post: finalvalue }));
  }
}
