import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../../core/services/post.service';
import { Post } from '../../core/models/post.model';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getAll().subscribe({
      next: (posts) => {
        this.posts = posts;
      },
      error: (err) => {
        console.error('❌ Failed to load posts:', err);
      }
    });
  }
}
