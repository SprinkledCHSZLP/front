import {Injectable} from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Subject, throwError} from 'rxjs';
import {AuthService} from '../../auth/services/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router, private toastrService: ToastrService) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.toastrService.error('Срок жизни токена закончился')
          this.authService.deleteToken();
          this.router.navigate(['']);
        } else if (error.status === 400) {
          this.toastrService.error(error.status.toString() + ' Поле заполнено неверно')
        } else {
          this.toastrService.error(error.message)
        }
        return throwError(() => error);
      })
    );
  }
}
