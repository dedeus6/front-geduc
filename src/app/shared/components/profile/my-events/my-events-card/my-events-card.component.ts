import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getEventModel } from 'src/app/models/getEvent.model';

@Component({
  selector: 'app-my-events-card',
  templateUrl: './my-events-card.component.html',
  styleUrls: ['./my-events-card.component.sass']
})
export class MyEventsCardComponent implements OnInit {

  @Input()
  event: getEventModel;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  
  chamaAlterarEvento(event: getEventModel): void {
    this.router.navigate(['../create-event'], {
      queryParams: event
    })
  }

}
