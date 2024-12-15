import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';  // Import HttpClient
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getFiles() {
    return this.http.get(`${this.apiUrl}/getfiles`);
  }

  uploadFile(formData: FormData) {
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  getFile(fileId: string) {
    return this.http.get(`${this.apiUrl}/getFileById/${fileId}`);
  }

  getFileUrl(fileId: string) {
    return `${this.apiUrl}/download/${fileId}`;
    // return this.http.get(`${this.apiUrl}/download/${fileId}`);
  }

  viewFile(fileId: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/viewFile/${fileId}`, { responseType: 'blob' });
  }

  downloadFile(fileId: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/download/${fileId}`, {
      responseType: 'blob',
    });
  }

}
