import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/Models/post.model';
import { AppState } from 'src/app/Store/app.state';
import { getPosts } from '../state/posts.selector';
import { ActivatedRoute, Router } from '@angular/router';
import { deletePost } from '../state/post.actions';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent {
  posts!: Observable<Post[]>;
  dataSource!: Post[];
  id: any;
  displayedColumns: string[] = ['id', 'title', 'description', 'actions'];
  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router:Router) {}
  ngOnInit() {
    this.route.paramMap.subscribe((dat) => {
      console.log(dat.get('id'), dat);
      this.id = dat.get('id');
    });
    this.posts = this.store.select(getPosts);
    this.posts.subscribe((data) => (this.dataSource = data));
  }

  deletePost(id: any) {
    if (confirm('Are you sure you want to delete')) {
      console.log('delete the post');
    }
    console.log(id);
    this.store.dispatch(deletePost({ id }));
    this.router.navigate(['/posts']);
  }
}
