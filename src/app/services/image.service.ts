import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private serverUrl = "http://test-task.eu-central-1.elasticbeanstalk.com/api";
  private uploadUrl = `${this.serverUrl}/upload`;
  private searchUrl = `${this.serverUrl}/search`;

  constructor(private http: HttpClient) {}

  uploadImage(file: any): Observable<any> {
    const formData: FormData = new FormData();
    const newFileName = `${uuidv4()}.${file.name.split('.').pop()}`;
    formData.append('file', file, newFileName);
    console.log(file.name)
    return this.http.post(this.uploadUrl, formData);
  }

  searchImages(label: string): Observable<any> {
    return this.http.get(`${this.searchUrl}/${label}`);
  }
}
