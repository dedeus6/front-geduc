import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Files } from 'src/app/models/files.model';
import { getEventModel } from 'src/app/models/getEvent.model';
import { User } from 'src/app/models/user.model';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-watch-events-page',
  templateUrl: './watch-events-page.component.html',
  styleUrls: ['./watch-events-page.component.sass']
})
export class WatchEventsPageComponent implements OnInit {
  event: any;
  files: Array<File> = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private storageService: StorageService
  ) { }
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.event = params;
      console.log('evento',this.event)
      this.getFilesOfEVent(this.event.filesId)
    })
  }

  getFilesOfEVent(filesId: string): void {
    this.storageService.getFiles(filesId).subscribe((response) => {
      response.files.forEach((file) => {
        this.b64toBlob(file.bytes, file.contentType, '',file.name)
      })    
    })
  }

  b64toBlob(b64Data, contentType, sliceSize, name): Blob {
    contentType = contentType || 'video/*';
    sliceSize = sliceSize || 512;
  
    var byteCharacters = atob(b64Data);
    var byteArrays = [];
  
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
    
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
      }
    
      var byteArray = new Uint8Array(byteNumbers);
    
      byteArrays.push(byteArray);
    }
  
    var blob = new Blob(byteArrays, {type: contentType});
    blob = blob.slice(0, blob.size, contentType)
    var file = new File([blob], name, {type: contentType} )
    this.files.push(file);
    console.log('files', this.files)
    return blob;
  }

}
