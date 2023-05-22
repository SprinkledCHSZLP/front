import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CHECKTOKEN_URL, USER_URL} from "../../conf/conf";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {
  }

  //ТУТ БУДЕТ ЮЗЕР ГЕТ КАРРЕНТ

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

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
      this.http.get(CHECKTOKEN_URL).subscribe({
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

  login(login: string, password: string) {
    this.http
      .post(USER_URL, {
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
