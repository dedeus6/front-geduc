import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { AuthService } from 'src/app/shared/services/auth.service';

export interface Skill {
  name: string;
}
@Component({
  selector: 'app-tela-cadastro',
  templateUrl: './tela-cadastro.component.html',
  styleUrls: ['./tela-cadastro.component.sass']
})
export class TelaCadastroComponent implements OnInit {

  registerForm: FormGroup;
  passwordsValidator: boolean  = false;
  skillsFiltradas = [];

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        passwordConfirmation: ['', [Validators.required, Validators.minLength(5)]],
        registration: ['', [Validators.required]],
        techs: [[this.skillsFiltradas]]
        });
  }

  ngOnInit(): void {
    
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  skills: Skill[] = [{name: 'Java'}, {name: 'Python'}, {name: 'Angular'}];


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.skills.push({name: value});
    }

    event.input.value = "";

  }

  remove(skill: Skill): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  submitRegister(){
    let dataRegister = this.registerForm.getRawValue();
    dataRegister.techs = this.skills.map(a => a.name)
    if(this.registerForm.valid){
      if(dataRegister.password == dataRegister.passwordConfirmation){
        this.passwordsValidator = false;
        delete dataRegister.passwordConfirmation;
        console.log(dataRegister);
        this.authService.register(dataRegister).subscribe((response) =>{
          console.log('form:', response);
        })
      } else {
        this.passwordsValidator = true;
      }
    }
    
    // this.authService.register(this.registerForm).subscribe((resposta)=> {
    //   console.log(resposta);
    // });
  }
}
