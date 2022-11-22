import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(values: {registration: string, password: string}){
    return this.http.post<User>(environment.GEDUC_API + '/v1/user/auth',  values);
  }

  register(filter: any) {
    return this.http.post<User>(environment.GEDUC_API + '/v1/user', filter);
  }

  getLoggedUserEndpoint(registration: string) {
    return this.http.get<User>(environment.GEDUC_API + '/v1/user/'+ registration);
  }

  clear(){
    sessionStorage.clear()
  }

  isAuthenticated(){
    return (sessionStorage.getItem('user')!==null?true:false);
  }

  getLoggedUser(): User {
    return sessionStorage.getItem('user')!==null ? JSON.parse(sessionStorage.getItem('user')) : null;
  }

  logout(){
    this.clear();
  }
}
