import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventModel } from 'src/app/models/event.model';
import { AuthService } from '../../services/auth.service';
import { ModalSubscribeComponent } from '../modal-subscribe/modal-subscribe.component';

@Component({
  selector: 'app-card-event',
  templateUrl: './card-event.component.html',
  styleUrls: ['./card-event.component.sass']
})
export class CardEventComponent implements OnInit {
  @Input()
  event: EventModel;

  showCard: boolean = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.event);
  }

  openModal() {
    const dialogRef = this.dialog.open(ModalSubscribeComponent, {
      data : this.event
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
