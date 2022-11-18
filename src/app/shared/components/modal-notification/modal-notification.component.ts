import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-notification',
  templateUrl: './modal-notification.component.html',
  styleUrls: ['./modal-notification.component.sass']
})
export class ModalNotificationComponent implements OnInit {
  notifications: Array<string> = ['Certificado 1', 'Certificado 2', 'Certificado 3', 'Certificado 4'];
  constructor() {
    console.log(this.notifications)
  }

  ngOnInit(): void {
  }

}
