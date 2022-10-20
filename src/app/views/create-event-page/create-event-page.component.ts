import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-event-page',
  templateUrl: './create-event-page.component.html',
  styleUrls: ['./create-event-page.component.sass']
})
export class CreateEventPageComponent implements OnInit {
  lessons: Array<string> = ['Evento 1', 'Evento 2', 'Evento 3'];
  constructor() { }
  
  ngOnInit(): void {
  }

}
