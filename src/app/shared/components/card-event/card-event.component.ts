import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { getEventModel } from 'src/app/models/getEvent.model';
import { AuthService } from '../../services/auth.service';
import { ModalSubscribeComponent } from '../modal-subscribe/modal-subscribe.component';

@Component({
  selector: 'app-card-event',
  templateUrl: './card-event.component.html',
  styleUrls: ['./card-event.component.sass']
})
export class CardEventComponent implements OnInit {
  @Input()
  event: getEventModel;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openModal() {
    const dialogRef = this.dialog.open(ModalSubscribeComponent, {
      data : this.event
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
