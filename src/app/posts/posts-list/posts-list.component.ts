import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/Models/post.model';
import { AppState } from 'src/app/Store/app.state';
import { getPosts } from '../state/posts.selector';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent {
  posts!: Observable<Post[]>;
  dataSource!: Post[];
  displayedColumns: string[] = ['id', 'title', 'description', 'actions'];
  constructor(private store: Store<AppState>) {}
  ngOnInit() {
    this.posts = this.store.select(getPosts);
    this.posts.subscribe((data) => (this.dataSource = data));
  }
  updateAction(i: any) {
    console.log(i+1);
  }
}
