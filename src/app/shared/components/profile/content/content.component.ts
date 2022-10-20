import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';
import { ContentService } from 'src/app/shared/services/content.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Skill {
  name: string;
}

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
  skills: Skill[] = [{name: 'Java'}, {name: 'Python'}, {name: 'Angular'}];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.techs.push(value);
    }

    event.input.value = "";

  }

  remove(tech: Skill): void {
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
        panelClass: ['blue-snackbar']
      });
    })
  }

}
