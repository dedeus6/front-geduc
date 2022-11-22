import { Component, OnInit, Inject } from '@angular/core';
import { NotificationModel } from 'src/app/models/notification.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-modal-notification',
  templateUrl: './modal-notification.component.html',
  styleUrls: ['./modal-notification.component.sass']
})
export class ModalNotificationComponent implements OnInit {

  loggedUser: User;
  notifications: Array<NotificationModel>;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
    ) {
  }

  ngOnInit(): void {
    this.loggedUser = this.authService.getLoggedUser();
    this.listNotifications();
  }

  listNotifications() {
    this.notificationService.getNotifications(this.loggedUser.registration).subscribe(response => {
      this.notifications = response;
    });
  }

  readNotification(notificationId: string): void {
    this.notificationService.readNotifications(notificationId).subscribe(response => {
      this.listNotifications();
    });
  }

}
