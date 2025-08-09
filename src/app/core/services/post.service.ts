import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Post } from '../models/post.model';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService {
  private baseUrl = 'http://localhost:8080/api/posts';
   posts = signal<Post[]>([]);

  constructor(private http: HttpClient, private userService: UserService) {}

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl);
  }


createPost(postData: { content: string }): Observable<Post> {
  // optimistic stub
  const user = this.userService.user();
  const optimistic: Post = {
    id: -Date.now(),
    title: '',
    content: postData.content,
    author: user ? { username: user.username, email: user.email } : { username: 'me', email: '' },
    createdAt: new Date().toISOString(),
  } as Post;
  this.posts.set([optimistic, ...this.posts()]);

  return this.http.post<Post>(this.baseUrl, postData).pipe(
    tap((newPost) => {
      // replace the optimistic one
      const arr = this.posts().slice();
      const idx = arr.findIndex(p => p.id === optimistic.id);
      if (idx !== -1) {
        arr[idx] = newPost;
      } else {
        arr.unshift(newPost);
      }
      this.posts.set(arr);
    })
  );
}

}
