import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';
import { ContentService } from 'src/app/shared/services/content.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tech } from 'src/app/models/tech.model';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.sass']
})
export class ContentComponent implements OnInit {
  emailUsuario: string;
  localRegistration: Usuario;
  getRegistration: string;
  constructor(private authService: AuthService, private contentService: ContentService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.localRegistration = JSON.parse(sessionStorage.getItem('user'))
    this.getUsuarioLogado(this.localRegistration);
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  techs: any[];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.techs.push(value);
    }

    event.input.value = "";

  }

  remove(tech: Tech): void {
    const index = this.techs.indexOf(tech);

    if (index >= 0) {
      this.techs.splice(index, 1);
    }
  }

  getUsuarioLogado(localRegistration: Usuario):void {
    
    this.authService.getUsuarioLogado(localRegistration.registration).subscribe((response) =>{
      this.emailUsuario = response.email;
      this.techs = response.techs;
      this.getRegistration = response.registration;
    })
  }

  alterarTecnologiasUsuario(){
    const filtro = {
      techs: this.techs
    }
    this.contentService.alterarTechsUsuario(this.getRegistration, filtro).subscribe((response) => {
      this.snackBar.open("Tecnologias alteradas com Sucesso", 'X', {
        duration: 3000,
        panelClass: ['green-snackbar']
      });
    })
  }

}
