import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogin = new BehaviorSubject<boolean>(false);
  login: string = localStorage.getItem('login_email');

  constructor(private http: HttpClient) {}

  registration(data: any) {
    return this.http.post(`${environment.apiUrl}/user/register`, data);
  }

  loginUser(data: any) {
    return this.http.post(`${environment.apiUrl}/user/login`, data);
  }

  forget(data: any) {
    return this.http.post(`${environment.apiUrl}/user/forget-password`, data);
  }
}
