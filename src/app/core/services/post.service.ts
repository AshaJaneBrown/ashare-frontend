import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService {
  private baseUrl = 'http://localhost:8080/api/posts';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl);
  }
}
