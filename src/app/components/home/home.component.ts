import { Component, OnInit } from '@angular/core';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  files: any[] = [];
  selectedFile: File | null = null;

  constructor(private fileService: FileService) {}

  ngOnInit(): void {
    this.getFiles();
  }

  // Fetch all files
  getFiles() {
    this.fileService.getFiles().subscribe((data: any) => {
      this.files = data;
    });
  }

  // File selection handler
  onFileSelect(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // Upload file
  uploadFile() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.fileService.uploadFile(formData).subscribe(() => {
        alert('File uploaded successfully');
        this.getFiles(); // Refresh file list
      });
    }
  }
}
