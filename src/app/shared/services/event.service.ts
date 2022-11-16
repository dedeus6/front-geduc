import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventModel } from 'src/app/models/event.model';
import { getEventModel } from 'src/app/models/getEvent.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class EventService {

    constructor(private http: HttpClient) { }

    createEvent(event: EventModel){
      return this.http.post<EventModel>(environment.GEDUC_API + '/v1/event', event);
    }

    getEvents(filtro: any){
      return this.http.get<Array<getEventModel>>(environment.GEDUC_API + `/v1/event?${filtro.parametro}`)
    }

    editEvents(event: EventModel, eventNumber: string){
      return this.http.put<EventModel>(environment.GEDUC_API + `/v1/event/${eventNumber}`, event);
    }

    // private handleError(error: HttpErrorResponse) {
    //   if(error.status === 0){

    //   } else if (error.status >= 500 && error.status <= 599){

    //   } else {

    //   }
    //   return thr
    // }
}