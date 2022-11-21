import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getEventModel } from 'src/app/models/getEvent.model';
import { User } from 'src/app/models/user.model';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'app-search-events-page',
  templateUrl: './search-events-page.component.html',
  styleUrls: ['./search-events-page.component.sass']
})
export class SearchEventsPageComponent implements OnInit {
  localRegistration: User;
  eventTitle: string;
  events: getEventModel[];
  hasEvents: boolean = false;
  constructor(private route: ActivatedRoute, private eventService: EventService, private router: Router) {
    this.localRegistration = JSON.parse(sessionStorage.getItem('user'));
    this.eventTitle = this.route.snapshot.queryParamMap.get('eventTitle');
   }

  ngOnInit(): void {
    this.getEventsWithTitle(this.eventTitle);
    
  }

  getEventsWithTitle(title: string): any {
    const filter = {
      param: 'title='+title
    }
    this.eventService.getEvents(filter).subscribe((response) => {
      this.events = response;
      console.log('events', this.events)
      if(this.events.length > 0) {
        this.hasEvents = true;
      }
    });
  }
}
