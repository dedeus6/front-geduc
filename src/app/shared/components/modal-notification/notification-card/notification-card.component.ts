import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.sass']
})
export class NotificationCardComponent implements OnInit {
  @Input()
  notification: any;
  constructor() {
    console.log('notiifica',this.notification)
   }

  ngOnInit(): void {
  }

}
