import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../_model/login';
import { Register } from '../_model/register';
import { Refresh } from '../_model/refresh';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = "http://localhost:8888/auth"

  constructor(private http: HttpClient) { }

  signin(register: Register): Observable<object>{
    return this.http.post(`${this.url}/register`, register);
  }

  sigup(login: Login): Observable<any>{
    return this.http.post(`${this.url}/login`, login);
  }

  refreshToken(refresh: Refresh): Observable<object>{
    return this.http.post(`${this.url}/refreshToken`,refresh);
  }

  logout(): Observable<any>{
    return this.http.post(`${this.url}/logout`,'');
  }

  logout1(): Observable<any>{
    return this.http.get(`${this.url}/he`,);
  }

}
