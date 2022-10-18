import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { AuthService } from 'src/app/shared/services/auth.service';

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
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // console.log(localStorage.getItem('user'));
    // console.log(this.authService.isAuthenticated());
    this.getUsuarioLogado();
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

  getUsuarioLogado():void {
    this.authService.getUsuarioLogado('22050141').subscribe((response) =>{
      console.log(response);
      this.emailUsuario = response.email;
      this.techs = response.techs;
    })
  }

}
