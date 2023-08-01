import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addNewPost } from '../state/post.actions';
import { Post } from 'src/app/Models/post.model';
import { AppState } from 'src/app/Store/app.state';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent {
  postForm!: FormGroup;
  postFormError!: string;
  constructor(private store: Store<AppState>) {}
  ngOnInit() {
    this.postForm = new FormGroup({
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
  showDescriptionErrors() {
    const descriptionForm = this.postForm.get('description');
    if (descriptionForm?.touched && !descriptionForm.valid) {
      if (descriptionForm.errors?.['required']) {
        return 'Description is required';
      }
      if (descriptionForm.errors?.['minLength']) {
        return 'Description should be of minimum 10 Characters length';
      }
    }
    return '';
  }
  onAddPost() {
    console.log(this.postForm.value);
    const post: Post = {
      title: this.postForm.value.title,
      description: this.postForm.value.description,
    };
    this.store.dispatch(addNewPost({ post }));
    this.postForm.reset();
  }
}
