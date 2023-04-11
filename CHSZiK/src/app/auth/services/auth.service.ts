import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {}

  //установка токена в память
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  //получение токена
  getToken() {
    return localStorage.getItem('token');
  }
  //проверка авторизации
  isLoggedIn() {
    return this.getToken() !== null;
  }
  //делается post запрос по API с логином и паролем
  login(login: string, password: string) {
    this.http
      .post('http://localhost:5000/api/authenticate', {
        email: login,
        password: password,
      })
      .subscribe({
        next: (res: any) => {
          this.setToken(res.token);
          this.router.navigate(['/main']);
        },
        error: (err) => {
          console.log('Опс, ошибка', err);
        },
        complete: () => {
          console.log('Доступ разрешён');
        },
      });
  }
}
