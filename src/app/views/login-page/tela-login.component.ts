import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.component.html',
  styleUrls: ['./tela-login.component.sass']
})
export class TelaLoginComponent implements OnInit{
  hide = true;
  loginForm: FormGroup;
  mostraWarningCredencial: boolean;
  mostraErro: boolean;
  

  constructor(private fb: FormBuilder, public authService: AuthService, private snackBar: MatSnackBar, private router: Router) {
    this.loginForm = this.fb.group(
      {
        registration: ['', [Validators.required]],
        password: ['', [Validators.required]]
      }
    )
  }
  ngOnInit(): void {
    this.mostraWarningCredencial = false;
    this.mostraErro = false;
  }

  submit(){

    let dataLogin = this.loginForm.getRawValue();
    if(this.loginForm.valid){
      this.authService.login(dataLogin).subscribe(
        (response) => {
          this.snackBar.open("Usuário Logado com Sucesso", 'X', {
            duration: 3000,
            panelClass: ['green-snackbar']
          });
          this.router.navigate(['/home']);
          this.mostraWarningCredencial = false;

          sessionStorage.setItem('user', JSON.stringify(response)); // Substitui o JWT (JSON Web Token)
          
        }, 
        (error) => {
          console.log(error)
          if(error.status === 422){
            this.mostraWarningCredencial = true;
            this.mostraErro = false;
          } else {
            this.mostraWarningCredencial = false;
            this.mostraErro = true;
          }
        }
      );
    }
  }
}
