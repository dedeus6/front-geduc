import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';
import { ContentService } from 'src/app/shared/services/content.service';

export interface Skill {
  name: string;
}

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.sass']
})
export class ContentComponent implements OnInit {
  emailUsuario: String;
  localRegistration: Usuario;
  constructor(private authService: AuthService, private contentService: ContentService) { }

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
      console.log(response);
      this.emailUsuario = response.email;
      this.techs = response.techs;
    })
  }

  alterarTecnologiasUsuario(){
    console.log('chamei:', this.localRegistration.registration)
    this.contentService.alterarTechsUsuario(this.localRegistration.registration).subscribe((response) => {
      console.log('response:',response);
      console.log('techs:',this.techs);
    })
  }

}
