import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-view-file',
  templateUrl: './view-file.component.html',
  styleUrls: ['./view-file.component.scss'],
})
export class ViewFileComponent implements OnInit {
  file: any;
  fileUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    const fileId = this.route.snapshot.paramMap.get('id');
    if (fileId) {
      this.fileService.getFile(fileId).subscribe((data: any) => {
        this.file = data;
        console.log("fileId: ", fileId);
        this.fileUrl = this.fileService.getFileUrl(fileId);
        console.log("this.fileUrl: ", this.fileUrl);
      });
    }
  }
}
