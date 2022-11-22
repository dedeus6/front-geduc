import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getEventModel } from 'src/app/models/getEvent.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EventService } from 'src/app/shared/services/event.service';
import { ModalConfirmComponent } from '../../../modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-my-subscribed-events-card',
  templateUrl: './my-subscribed-events-card.component.html',
  styleUrls: ['./my-subscribed-events-card.component.sass']
})
export class MySubscribedEventsCardComponent implements OnInit {
  @Input()
  eventSubscribed: getEventModel;

  @Output()
  listSubscribedEvents = new EventEmitter<boolean>(false);

  loggedUser: User;

  constructor(private authService: AuthService, private eventService: EventService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loggedUser = this.authService.getLoggedUser();
  }

  unsubscribeEvent(eventNumber: string): void {
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      data: {
        title: 'Cancelar inscrição',
        message: 'Tem certeza que quer cancelar sua inscrição neste evento?',
        buttonConfirmText: 'Cancelar Inscrição',
        buttonCancelText: 'Fechar'
      }
    })

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.eventService.unsubscribeEvents(eventNumber, this.loggedUser.registration).subscribe(response => {
          this.snackBar.open("Inscrição cancelada com sucesso.", 'X', {
            duration: 3000,
            panelClass: ['green-snackbar']
          });
          this.listSubscribedEvents.emit(true);
        });
      }
    })
  }
}
