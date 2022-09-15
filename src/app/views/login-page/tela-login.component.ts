import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.component.html',
  styleUrls: ['./tela-login.component.sass']
})
export class TelaLoginComponent implements OnInit{

  loginForm: FormGroup;
  mostraWarningCredencial: boolean;

  constructor(private fb: FormBuilder, public authService: AuthService) {
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
      this.authService.login(dataLogin).subscribe(
        (response) => {
          this.mostraWarningCredencial = false;

          localStorage.setItem('user', JSON.stringify(response)); // Substitui o JWT (JSON Web Token)
          alert('Login Realizado com sucesso');
          
        }, 
        (error) => {
          this.mostraWarningCredencial = true;
        }
      );
    }
  }
}
