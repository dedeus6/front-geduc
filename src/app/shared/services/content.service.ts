import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Techs {
  techs: String[]
}

@Injectable({
  providedIn: 'root'
})


export class ContentService {

  constructor(private http: HttpClient) { }

  alterarTechsUsuario(matricula: string) {
    return this.http.put<Techs>(environment.GEDUC_API + '/v1/user/update/'+matricula, null);
  }
}
