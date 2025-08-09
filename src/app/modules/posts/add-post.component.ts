import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../core/services/post.service';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-post.component.html',
   styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent {
  postForm: FormGroup;

  constructor(private fb: FormBuilder, private postService: PostService) {
    this.postForm = this.fb.group({
      content: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  onSubmit() {
    if (this.postForm.invalid) return;

    this.postService.createPost(this.postForm.value).subscribe({
      next: () => this.postForm.reset(),
    });
  }
}
