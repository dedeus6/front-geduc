import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventModel } from 'src/app/models/event.model';
import { EventSubscribe } from 'src/app/models/eventSubscribe.model';
import { getEventModel } from 'src/app/models/getEvent.model';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class EventService {

    constructor(private http: HttpClient) { }

    createEvent(event: EventModel){
      return this.http.post<EventModel>(environment.GEDUC_API + '/v1/event', event);
    }

    getEvents(filter: any){
      return this.http.get<Array<getEventModel>>(environment.GEDUC_API + `/v1/event?${filter.param}`)
    }

    editEvents(event: EventModel, eventNumber: string){
      return this.http.put<EventModel>(environment.GEDUC_API + `/v1/event/${eventNumber}`, event);
    }

    subscribeEvents(eventSubscribe: EventSubscribe){
      return this.http.post<EventSubscribe>(environment.GEDUC_API + '/v1/event/subscribe', eventSubscribe);
    }

    getSubscribedEvents(registration: string, eventNumber: string){
      return this.http.get<Array<getEventModel>>(environment.GEDUC_API + `/v1/event/subscribed/${registration}`, {
        params: eventNumber === null ? {} : {eventNumber}
      })
    }

    unsubscribeEvents(eventNumber: string, registration: string){
      return this.http.post<void>(environment.GEDUC_API + `/v1/event/unsubscribe/${eventNumber}/${registration}`, {});
    }
}