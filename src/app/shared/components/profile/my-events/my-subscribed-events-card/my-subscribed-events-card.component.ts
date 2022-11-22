import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { getEventModel } from 'src/app/models/getEvent.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EventService } from 'src/app/shared/services/event.service';

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

  constructor(private authService: AuthService, private eventService: EventService) { }

  ngOnInit(): void {
    this.loggedUser = this.authService.getLoggedUser();
  }

  unsubscribeEvent(eventNumber: string): void {
    this.eventService.unsubscribeEvents(eventNumber, this.loggedUser.registration).subscribe(response => {
      this.listSubscribedEvents.emit(true);
    });
  }
}
