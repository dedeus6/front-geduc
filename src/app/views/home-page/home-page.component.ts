import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass']
})
export class HomePageComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    console.log(localStorage.getItem('user'));
    console.log(this.authService.isAuthenticated());
  }

}
