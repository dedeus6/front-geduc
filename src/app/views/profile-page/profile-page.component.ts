import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MenuModel } from '../../models/menu.model';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.sass']
})
export class ProfilePageComponent implements OnInit {

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
      name: 'Sair',
      icon: 'exit_to_app',
      path: '../login'
    }
  ];

  constructor(
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  executarOpcao(menu){
    if(menu.name === 'Sair') {
      this.authService.logout();
    }
  }

}
