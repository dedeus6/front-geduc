import { HttpClient } from '@angular/common/http';
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

    getEventsOfUser(filtro: any){
      return this.http.get<getEventModel>(environment.GEDUC_API + `/v1/event?${filtro.nome}=${filtro.valor}`)
    }

}