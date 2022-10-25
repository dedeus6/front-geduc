import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

export interface Skill {
  name: string;
}
@Component({
  selector: 'app-tela-cadastro',
  templateUrl: './tela-cadastro.component.html',
  styleUrls: ['./tela-cadastro.component.sass']
})
export class TelaCadastroComponent implements OnInit {
  hide = true;
  registerForm: FormGroup;
  passwordsValidator: boolean  = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar, private router: Router) {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        passwordConfirmation: ['', [Validators.required, Validators.minLength(5)]],
        registration: ['', [Validators.required]],
        techs: []
        });
  }

  ngOnInit(): void {
    
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  skills: Skill[] = [{name: 'Java'}];


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
        this.authService.register(dataRegister).subscribe(() =>{
          this.snackBar.open("Usuário Cadastrado com Sucesso", 'X', {
            duration: 3000,
            panelClass: ['blue-snackbar']
          });
          this.router.navigate(['/login']);
        })
      } else {
        this.passwordsValidator = true;
      }
    }
  }
}
