import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(values: {registration: string, password: string}){
    return this.http.get(environment.GEDUC_API + 'v3/f5450bd3-e50f-40c5-b6f6-3053c06765ea');
  }
}
