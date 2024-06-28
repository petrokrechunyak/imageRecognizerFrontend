import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ImageService } from '../../services/image.service';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  styleUrls: ['./image-search.component.css']
})
export class ImageSearchComponent {
  uploadForm: FormGroup;
  searchForm: FormGroup;
  searchResults: any[];
  file: File | null = null;

  constructor(private fb: FormBuilder, private imageService: ImageService) {
    this.uploadForm = this.fb.group({
      image: ['', Validators.required]
    });

    this.searchForm = this.fb.group({
      keyword: ['', Validators.required]
    });

    this.searchResults = [];
  }

  onChange(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.file = file;
    }
  }

  onUpload(): void {
    if (this.uploadForm.invalid) {
      return;
    }

    this.imageService.uploadImage(this.file).subscribe(
      (response) => {
        console.log('Upload successful', response);
        alert('Image uploaded successfully');
        this.uploadForm.reset();
      },
      (error) => {
        console.error('Upload failed', error);
      }
    );
  }

  onSearch(): void {
    if (this.searchForm.invalid) {
      return;
    }

    const keyword = this.searchForm.get('keyword')!.value;
    this.imageService.searchImages(keyword).subscribe(
      (results) => {
        results = results.map((x:string) => "https://testbucketfortask1.s3.eu-central-1.amazonaws.com/"+x);
        this.searchResults = results;
        console.log('Search results', results);
      },
      (error) => {
        console.error('Search failed', error);
      }
    );
  }
}
