import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.component.html',
  styleUrls: ['./tela-login.component.sass']
})
export class TelaLoginComponent implements OnInit{

  loginForm: FormGroup;
  mostraWarningCredencial: boolean;
  

  constructor(private fb: FormBuilder, public authService: AuthService, private snackBar: MatSnackBar) {
    this.loginForm = this.fb.group(
      {
        registration: ['', [Validators.required]],
        password: ['', [Validators.required]]
      }
    )
  }
  ngOnInit(): void {
    this.mostraWarningCredencial = false;
    console.log(localStorage.getItem('user'));
  }

  submit(){

    let dataLogin = this.loginForm.getRawValue();
    if(this.loginForm.valid){
      this.snackBar.open("Usuário Logado com Sucesso", 'X');
      this.authService.login(dataLogin).subscribe(
        (response) => {
          this.mostraWarningCredencial = false;

          localStorage.setItem('user', JSON.stringify(response)); // Substitui o JWT (JSON Web Token)
          
        }, 
        (error) => {
          this.mostraWarningCredencial = true;
        }
      );
    }
  }
}
