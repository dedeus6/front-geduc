import { Component, Input, OnInit } from '@angular/core';
import { getEventModel } from 'src/app/models/getEvent.model';
import { User } from 'src/app/models/user.model';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.sass']
})
export class MyEventsComponent implements OnInit {

  events: getEventModel[];
  eventsSubscribed: getEventModel[];
  localRegistration: User;
  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.localRegistration = JSON.parse(sessionStorage.getItem('user'))
    this.getEvents(this.localRegistration);
  }
  
  getEvents(loggedUser: User): void {
    const filter = {
      param: "creatorRegistration="+loggedUser.registration
    }
    this.eventService.getEvents(filter).subscribe((response) => {
      this.events = response;
    })
    this.eventService.getSubscribedEvents(loggedUser.registration).subscribe((response) => {
      this.eventsSubscribed = response;
    })
  }
}
