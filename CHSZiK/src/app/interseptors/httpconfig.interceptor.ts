// import { Injectable } from '@angular/core';
// import {
//   HttpInterceptor,
//   HttpRequest,
//   HttpHandler,
//   HttpErrorResponse,
// } from '@angular/common/http';
// import { throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { AuthService } from '../auth/services/auth.service';
// import { Router } from '@angular/router';

// @Injectable()
// export class HttpConfigInterceptor implements HttpInterceptor {
//   constructor(private authService: AuthService, private router: Router) {}

//   intercept(request: HttpRequest<any>, next: HttpHandler) {
//     const token = this.authService.getToken();

//     // Clone the request and add the token as an Authorization header
//     const authReq = request.clone({
//       headers: request.headers.set('Authorization', `${token}`),
//     });

//     // Pass on the cloned request instead of the original request.
//     return next.handle(authReq).pipe(
//       catchError((error: HttpErrorResponse) => {
//         // Handle server errors here
//         console.log('Error:', error);
//         if (error.status === 401) {
//           console.log('ошибка 401 Интерсептор работает');
//           this.authService.deleteToken();
//           this.router.navigate(['auth']);
//         }
//         return throwError(error);
//       })
//     );
//   }
// }
