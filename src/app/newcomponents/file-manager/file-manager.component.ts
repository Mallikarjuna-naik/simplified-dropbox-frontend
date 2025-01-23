import { Component, OnInit } from '@angular/core';
import { FileService } from '../../services/file.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss'],
})
export class FileManagerComponent implements OnInit {
  files: any[] = []; 
  selectedFile: File | null = null; 
  isRotating = false;
  fileTypes = ['.txt', '.jpg', '.png','.jpeg', '.json', '.pdf']; // Allowed file types
  paginatedFiles: any[] = []; // To display files for the current page
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  totalPagesArray: number[] = [];

  constructor( private fileService: FileService, private snackBar: MatSnackBar ) {}

  ngOnInit(): void {
    this.fetchFiles();
  }

  openSnackBar(message: string, action: string) {
    console.log('Snackbar is triggered');
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['custom-snackbar']
    });
  }

  rotateIcon() {
    this.isRotating = !this.isRotating;
    this.refresh();
    // this.openSnackBar('Data fetched successfully!', 'Close');
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
  
      this.fileService.uploadFile(formData).subscribe( (res:any) => {
        console.log("uploaded file response: ", res);
        this.openSnackBar(`${res?.message}`, 'Close');
        // alert('File uploaded successfully!');
        this.selectedFile = null; // Reset file input
        this.fetchFiles(); // Refresh file list
      });
    }
    else {
      let errorMessage = 'Invalid file type. Allowed types are: ' + this.fileTypes.join(', ')
      this.openSnackBar(errorMessage, 'Close');
      // alert('Invalid file type. Allowed types are: ' + this.fileTypes.join(', '));
      this.selectedFile = null;
    }
  }

  previousPage(){
    if(this.currentPage >= 1 && this.currentPage <= this.totalPages){
      this.currentPage --;
      this.showFilesFromBatches()
    }
  }

  nextPage(){
    if(this.currentPage >= 1 && this.currentPage <= this.totalPages){
      this.currentPage++;
      this.showFilesFromBatches()
    }
  }

  currentPageNum(currentPage:any){
    this.currentPage = currentPage;
    this.showFilesFromBatches()

  }
  showFilesFromBatches(){
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedFiles = this.files.slice(startIndex, endIndex);
  }
  /**
   * Fetch the list of files from the backend.
   */
  fetchFiles(): void {
    this.files = [];
    this.fileService.getFiles().subscribe((data: any) => {
      this.files = data?.files;
      this.totalPages = Math.ceil(this.files.length / this.itemsPerPage);
      this.totalPagesArray = Array(this.totalPages).fill(0).map((_, i) => i + 1);
      this.showFilesFromBatches();
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
      // link.download = 'downloaded_file'; // Customize the file name
      link.download = `${fileName}`
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
    this.openSnackBar('The data has been refreshed successfully.', 'Close');
  }

  deleteFile (fileId: string, fileName: string) {

    this.fileService.deleteFile(fileName).subscribe((data: any) => {
      // if(data)
      console.log("delete file api res:", data);
      this.files = [];
      this.fetchFiles();
      this.openSnackBar(`${data?.message}`, 'Close');
      // this.refresh();
    });
  }
}
