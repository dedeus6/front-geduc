import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { getEventModel } from 'src/app/models/getEvent.model';

@Component({
  selector: 'app-modal-subscribe',
  templateUrl: './modal-subscribe.component.html',
  styleUrls: ['./modal-subscribe.component.sass']
})
export class ModalSubscribeComponent implements OnInit {
  event: getEventModel
  constructor(
    protected dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log('data', this.data)
    this.event = this.data;
  }

  close() {
    this.dialog.closeAll();
  }

}
