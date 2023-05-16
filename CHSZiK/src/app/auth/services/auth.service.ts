import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {
  }

  //ТУТ БУДЕТ ЮЗЕР ГЕТ КАРРЕНТ

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
    if (this.getToken() !== null) {
      return true;
    }
    return false;
  }

  deleteToken() {
    return localStorage.clear();
  }

  // importToken = localStorage.getItem('token');
  ///////////////////////////
  isLoggedInn() {
    if (this.getToken() !== null) {
      this.http.get('http://195.161.68.107:8000/api/check_token').subscribe({
        next: () => {
          // return this.getToken() !== null;
          console.log('true');
          return true;
        },
        error: (err) => {
          // return this.getToken() == null;
          console.log('false', err);
          return false;
        },
        complete: () => {
          console.log('TRUE');
        },
      });
    }
    return false;
  }
  ////////////////////////
  // isLoggedIn() {
  //   if (this.getToken() !== null) {
  //     return true;
  //   }
  //   return false;
  // }
  //делается post запрос по API с логином и паролем
  login(login: string, password: string) {
    this.http
      .post('http://195.161.68.107:8000/api/user', {
        login: login,
        password: password,
      })
      .subscribe({
        next: (res: any) => {
          this.setToken(res['remember_token']);
          this.router.navigate(['/list-of-equipment']);
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
