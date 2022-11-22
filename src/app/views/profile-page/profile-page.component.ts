import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { getEventModel } from 'src/app/models/getEvent.model';
import { User } from 'src/app/models/user.model';
import { ModalConfirmComponent } from 'src/app/shared/components/modal-confirm/modal-confirm.component';
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
  localRegistration: User;
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
      //path: '../login'
    },
  ];
  

  constructor(
    private router: Router,
    public authService: AuthService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.localRegistration = JSON.parse(sessionStorage.getItem('user'));
    this.nomeUsuario = this.localRegistration.name.split(/(\s).+\s/).join(""); // regular expression que separa o array e ignora os espaços em branco a mais
  }

  executarOpcao(menu){
    if(menu.name === 'Sair') {
      const dialogRef = this.dialog.open(ModalConfirmComponent, {
        data: {
          title: 'Sair',
          message: 'Tem certeza que deseja sair?',
          buttonConfirmText: 'Sair',
          buttonCancelText: 'Fechar'
        }
      })
  
      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult) {
          this.authService.logout();
          this.router.navigate(['../login'])
        }
      })
    }

  }

}
