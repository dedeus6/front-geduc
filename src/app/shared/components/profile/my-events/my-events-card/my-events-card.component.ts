import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { getEventModel } from 'src/app/models/getEvent.model';
import { EventService } from 'src/app/shared/services/event.service';
import { ModalConfirmComponent } from '../../../modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-my-events-card',
  templateUrl: './my-events-card.component.html',
  styleUrls: ['./my-events-card.component.sass']
})
export class MyEventsCardComponent implements OnInit {

  @Input()
  event: getEventModel;

  @Output()
  listEvents = new EventEmitter<boolean>(false);

  constructor(private router: Router, private dialog: MatDialog, private eventService: EventService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  
  callEditEvents(event: getEventModel): void {
    this.router.navigate(['../create-event'], {
      queryParams: event
    })
  }

  cancelEvent(event: getEventModel) {
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      data: {
        title: 'Cancelar evento',
        message: 'Tem certeza que quer cancelar este evento?',
        buttonConfirmText: 'Cancelar Evento',
        buttonCancelText: 'Fechar'
      }
    })

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.eventService.cancelEvent(event.eventNumber).subscribe(response => {
          this.snackBar.open("Evento cancelado com sucesso.", 'X', {
            duration: 3000,
            panelClass: ['green-snackbar']
          });
          this.listEvents.emit(true);
        });
      }
    })
  }

}
