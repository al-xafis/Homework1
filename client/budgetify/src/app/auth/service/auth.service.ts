import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';
interface loginResponse {
  email: string;
  token: string;
  expiresIn: string;
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post<loginResponse>('http://localhost:3000/login', {
        email,
        password,
      })
      .pipe(tap((res) => this.setSession(res)));
  }

  isLoggedIn() {
    const expiresIn = localStorage.getItem('expiresIn');
    if (expiresIn) {
      return Date.now() < Number(expiresIn);
    }
    return false;
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('idToken');
  }

  private setSession(res: any) {
    const expiresIn = Date.now() + Number(res.expiresIn);
    localStorage.setItem('user', JSON.stringify(res));
    localStorage.setItem('idToken', res.token);
    localStorage.setItem('expiresIn', String(expiresIn));
  }
}
