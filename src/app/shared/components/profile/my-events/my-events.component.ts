import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.sass']
})
export class MyEventsComponent implements OnInit {

  events: Array<string> = ['Evento 1', 'Evento 2', 'Evento 3', 'Evento 4'];
  constructor() { }

  ngOnInit(): void {
  }

}
