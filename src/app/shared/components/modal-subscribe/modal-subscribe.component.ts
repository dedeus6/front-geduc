import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getEventModel } from 'src/app/models/getEvent.model';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-modal-subscribe',
  templateUrl: './modal-subscribe.component.html',
  styleUrls: ['./modal-subscribe.component.sass']
})
export class ModalSubscribeComponent implements OnInit {
  event: getEventModel
  constructor(
    protected dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private eventService: EventService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    console.log('data', this.data)
    this.event = this.data;
  }

  close() {
    this.dialog.closeAll();
  }

  subscribeInEvent(): void {
    const filter = {
      eventNumber: this.event.eventNumber,
      registration: this.event.creatorRegistration
    }
    this.eventService.subscribeEvents(filter).subscribe(() => {
      this.snackBar.open("Incrição feita no evento com sucesso", 'X', {
        duration: 3000,
        panelClass: ['green-snackbar']
      });
    })
  }
}
