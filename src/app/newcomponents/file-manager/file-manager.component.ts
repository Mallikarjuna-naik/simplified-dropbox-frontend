import { Component, OnInit } from '@angular/core';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss'],
})
export class FileManagerComponent implements OnInit {
  files: any[] = []; 
  selectedFile: File | null = null; 
  isRotating = false;
  fileTypes = ['.txt', '.jpg', '.png','.jpeg', '.json']; // Allowed file types

  constructor( private fileService: FileService ) {}

  ngOnInit(): void {
    this.fetchFiles();
  }

  rotateIcon() {
    this.isRotating = !this.isRotating;
    this.refresh();
  }

  /**
   * Triggered when a file is selected for upload.
   * @param event File input change event
   */
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] || null;
  }

  /**
   * Upload the selected file to the backend.
   */
  uploadFile(): void {
    if (!this.selectedFile) {
      alert('Please select a file to upload!');
      return;
    }

    const fileType = this.selectedFile.name.split('.').pop();

    if(this.fileTypes.includes('.' + fileType)) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
  
      this.fileService.uploadFile(formData).subscribe( () => {
        alert('File uploaded successfully!');
        this.selectedFile = null; // Reset file input
        this.fetchFiles(); // Refresh file list
      });
    }
    else {
      alert('Invalid file type. Allowed types are: ' + this.fileTypes.join(', '));
      this.selectedFile = null;
    }
  }

  /**
   * Fetch the list of files from the backend.
   */
  fetchFiles(): void {
    this.files = [];
    this.fileService.getFiles().subscribe((data: any) => {
      this.files = data;
      console.log("this.files: ",this.files);
    });
  }

  /**
   * Download a file by its ID.
   * @param fileId ID of the file to be downloaded
   */

  downloadFile(fileId: string, fileName: string): void {
    this.fileService.downloadFile(fileId).subscribe((fileContent) => {
      const url = URL.createObjectURL(fileContent);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'downloaded_file'; // Customize the file name
      link.click();
    });
  }

  /**
   * View a file by navigating to a new page with its ID.
   * @param fileId ID of the file to be viewed
   */

  viewFile(fileId: string): void {
    console.log("fileId: ", fileId);
    this.fileService.viewFile(fileId).subscribe((fileContent) => {
      // Open the file in a new tab for supported formats
      const url = URL.createObjectURL(fileContent);
      window.open(url);
    });
  }

  refresh(){
    this.files = [];
    this.fetchFiles();
  }

  deleteFile (fileId: string, fileName: string) {

    this.fileService.deleteFile(fileName).subscribe((data: any) => {
      // if(data)
      this.refresh();
    });
  }
}
