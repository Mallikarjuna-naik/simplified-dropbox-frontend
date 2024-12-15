import { Component, Input, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-file-view',
  templateUrl: './file-view.component.html',
  styleUrls: ['./file-view.component.scss']
})
export class FileViewComponent implements OnInit {
  @Input() filename!: string;
  fileContent: any;

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
    this.loadFile();
  }

  isBlob(content: any): boolean {
    return content instanceof Blob;
  }
  
  loadFile() {
    this.fileService.downloadFile(this.filename).subscribe((response: Blob) => {
      const contentType = response.type;
  
      if (contentType === 'application/json' || contentType === 'text/plain') {
        const reader = new FileReader();
        reader.onload = () => {
          this.fileContent = reader.result; // Text content
        };
        reader.readAsText(response);
      } else {
        const url = window.URL.createObjectURL(response);
        this.fileContent = url; // File URL for Blob
      }
    });
  }
  
}
