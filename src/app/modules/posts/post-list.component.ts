import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../../core/services/post.service';
import { AddPostComponent } from './add-post.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, AddPostComponent],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  // how many to show
  pageSize = 10;
  showCount = signal(this.pageSize);

  constructor(public postService: PostService) {}

  ngOnInit(): void {
      this.postService.getAll().subscribe({
        next: (posts) => this.postService.posts.set(posts),
        error: (err) => console.error('❌ Failed to load posts:', err),
      });
  }

  // newest first
  allSorted = computed(() => {
    const arr = [...this.postService.posts()];
    // sort by createdAt desc if you have it, else by id or leave as API order
    arr.sort((a: any, b: any) => {
      const da = new Date(a.createdAt ?? a.id ?? 0).getTime();
      const db = new Date(b.createdAt ?? b.id ?? 0).getTime();
      return db - da;
    });
    return arr;
  });

  // slice last N (already sorted desc)
  visible = computed(() => this.allSorted().slice(0, this.showCount()));

  canLoadMore = computed(() => this.allSorted().length > this.showCount());

  loadMore() {
    this.showCount.update(n => Math.min(n + this.pageSize, this.allSorted().length));
  }
}
