import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

// @Injectable()
// export class TokenInterceptor implements HttpInterceptor {
//   intercept(req: HttpRequest<any>, next: HttpHandler) {
//     const token = 'your_token_here';
//     const authReq = req.clone({
//       //   headers: req.headers.set('Authorization', `Bearer ${token}`),
//       headers: req.headers.set('Authorization', `${token}`),
//     });
//     return next.handle(authReq);
//   }
// }

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = this.authService.getToken();

    // Clone the request and add the token as an Authorization header
    const authReq = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });
    return next.handle(authReq);
  }
}
