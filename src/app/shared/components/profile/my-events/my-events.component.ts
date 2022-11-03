import { Component, Input, OnInit } from '@angular/core';
import { getEventModel } from 'src/app/models/getEvent.model';
import { Usuario } from 'src/app/models/usuario.model';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.sass']
})
export class MyEventsComponent implements OnInit {

  events: getEventModel[] = [];
  localRegistration: Usuario;
  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.localRegistration = JSON.parse(sessionStorage.getItem('user'))
    this.getEventsOfUser(this.localRegistration);
  }
  
  getEventsOfUser(usuarioLogado: Usuario): void {
    const filtro = {
      nome: "creatorRegistration",
      valor: usuarioLogado.registration
    }
    this.eventService.getEventsOfUser(filtro).subscribe((response) => {
      console.log(response)
      this.events.push(response);
    })
  }
}
