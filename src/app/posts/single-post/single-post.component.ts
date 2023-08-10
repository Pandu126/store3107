import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Post } from 'src/app/Models/post.model';
import { AppState } from 'src/app/Store/app.state';
import { getPostByID } from '../state/posts.selector';
import { getCurrentRoute } from 'src/app/router/router.selector';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
})
export class SinglePostComponent implements OnInit {
  post!: Observable<Post>;
  getRouteIdSubscription!: Subscription;
  constructor(private store: Store<AppState>) {}
  ngOnInit() {
    this.post = this.store.select(getPostByID);
    // this.getRouteIdSubscription = this.store
    //   .select(getCurrentRoute)
    //   .subscribe((router) => {
    //     console.log(router.params['id'],"called 1");
    //     this.store.select(getPostByID).subscribe((post) => {
    //       if (post) {
    //         this.post = post;
    //         console.log(this.post);
    //       }
    //     });
    //   });
  }
}
