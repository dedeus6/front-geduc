import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.component.html',
  styleUrls: ['./tela-login.component.sass']
})
export class TelaLoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group(
      {
        registrarion: ['', [Validators.required]],
        password: ['', [Validators.required]]
      }
    )
  }

  submit(){
      console.log(this.loginForm.getRawValue());
  }
}
