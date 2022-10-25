import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(values: {registration: string, password: string}){
    return this.http.post<Usuario>(environment.GEDUC_API + '/v1/user/auth',  values);
  }

  register(filtro: any) {
    return this.http.post<Usuario>(environment.GEDUC_API + '/v1/user', filtro);
  }

  getUsuarioLogado(matricula: string) {
    return this.http.get<Usuario>(environment.GEDUC_API + '/v1/user/'+ matricula);
  }

  clear(){
    sessionStorage.clear()
  }

  isAuthenticated(){
    return (sessionStorage.getItem('user')!==null?true:false);
  }

  getLoggedUser(): Usuario {
    return sessionStorage.getItem('user')!==null ? JSON.parse(sessionStorage.getItem('user')) : null;
  }

  logout(){
    this.clear();
  }
}
