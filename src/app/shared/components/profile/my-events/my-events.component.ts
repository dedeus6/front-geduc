import { Component, Input, OnInit } from '@angular/core';
import { getEventModel } from 'src/app/models/getEvent.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.sass']
})
export class MyEventsComponent implements OnInit {

  events: getEventModel[];
  eventsSubscribed: getEventModel[];
  loggedUser: User;
  constructor(private eventService: EventService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.loggedUser = this.authService.getLoggedUser();
    this.listEvents(this.loggedUser.registration);
  }
  
  listEvents(registration: string): void {
    const filter = {
      param: "creatorRegistration="+registration
    }
    this.eventService.getEvents(filter).subscribe((response) => {
      this.events = response;
    })
    this.eventService.getSubscribedEvents(registration, null).subscribe((response) => {
      this.eventsSubscribed = response;
    })
  }

  unsubscribeEvent(listEvents: boolean) {
    if (listEvents) {
      this.listEvents(this.loggedUser.registration);
    }
  }
}
