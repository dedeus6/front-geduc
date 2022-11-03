import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getEventModel } from 'src/app/models/getEvent.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ContentService } from 'src/app/shared/services/content.service';
import { EventService } from 'src/app/shared/services/event.service';
import { MenuModel } from '../../models/menu.model';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.sass']
})
export class ProfilePageComponent implements OnInit {
  primeiroNomeUsuario: string;
  ultimoNomeUsuario: string;
  nomeUsuario: string;
  localRegistration: Usuario;
  menuItems: Array<MenuModel> = [
    {
      name: 'Perfil',
      icon: 'person',
      path: 'personal'
    },
    {
      name: 'Certificados',
      icon: 'beenhere',
      path: 'certificates'
    },
    {
      name: 'Meus eventos',
      icon: 'videocam',
      path: 'my-events'
    },
    {
      name: 'Sair',
      icon: 'exit_to_app',
      path: '../login'
    },
  ];
  

  constructor(
    private router: Router,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.localRegistration = JSON.parse(sessionStorage.getItem('user'))
    this.nomeUsuario = this.localRegistration.name.split(/(\s).+\s/).join(""); // regular expression que separa o array e ignora os espaços em branco a mais
  }

  executarOpcao(menu){
    if(menu.name === 'Sair') {
      this.authService.logout();
    }
  }

}
