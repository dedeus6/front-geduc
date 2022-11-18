import { Component, Input, OnInit } from '@angular/core';
import { getEventModel } from 'src/app/models/getEvent.model';

@Component({
  selector: 'app-my-subscribed-events-card',
  templateUrl: './my-subscribed-events-card.component.html',
  styleUrls: ['./my-subscribed-events-card.component.sass']
})
export class MySubscribedEventsCardComponent implements OnInit {
  @Input()
  eventSubscribed: getEventModel;
  constructor() { }

  ngOnInit(): void {
  }

  apagar(eventSubscribed: getEventModel): void {
    
  }
}
