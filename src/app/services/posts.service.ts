import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../Models/post.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(
        `https://store3107-41ce8-default-rtdb.firebaseio.com/posts.json`
      )
      .pipe(
        map((data) => {
          const posts: Post[] = [];
          for (let key in data) {
            posts.push({ ...data[key], id: key });
          }
          return posts;
        })
      );
  }

  addPosts(postData: Post): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(
      `https://store3107-41ce8-default-rtdb.firebaseio.com/posts.json`,
      postData
    );
  }

  updatePost(post: Post) {
    const postData = {
      [post.id!]: { title: post.title, description: post.description },
    };
    return this.http.patch(
      `https://store3107-41ce8-default-rtdb.firebaseio.com/posts.json`,
      postData
    );
  }

  deletePost(id: string) {
    return this.http.delete(
      `https://store3107-41ce8-default-rtdb.firebaseio.com/posts/${id}.json`
    );
  }
  getPostId(id: string):Observable<any> {
    return this.http.get(
      `https://store3107-41ce8-default-rtdb.firebaseio.com/posts/${id}.json`
    );
  }
}
