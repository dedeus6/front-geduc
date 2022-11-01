import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-events-card',
  templateUrl: './my-events-card.component.html',
  styleUrls: ['./my-events-card.component.sass']
})
export class MyEventsCardComponent implements OnInit {

  @Input()
  event: string;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  
  chamaAlterarEvento(origem: string): void {
    this.router.navigate(['../create-event'], {
      queryParams: {
        origem: origem
      }
    })
  }

}
