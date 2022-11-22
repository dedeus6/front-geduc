import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationModel } from 'src/app/models/notification.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class NotificationService {

    constructor(private http: HttpClient) { }

    getNotifications(registration: string){
        return this.http.get<Array<NotificationModel>>(environment.GEDUC_API + `/v1/notification/${registration}`)
    }

    readNotifications(notificationId: string){
        return this.http.post<Array<void>>(environment.GEDUC_API + `/v1/notification/read/${notificationId}`, {})
    }

}