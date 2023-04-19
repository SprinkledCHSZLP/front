// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormControl } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from 'src/app/auth/services/auth.service';
// import { HttpClient } from '@angular/common/http';
//
// @Component({
//   selector: 'app-auth',
//   templateUrl: './auth.component.html',
//   styleUrls: ['./auth.component.scss'],
// })
// export class AuthComponent implements OnInit {
//   authForm!: FormGroup;
//   constructor(
//     private router: Router,
//     private authService: AuthService,
//     private http: HttpClient
//   ) {}
//
//   submitAuth() {
//     this.authService.login(
//       this.authForm.get('login')?.value,
//       this.authForm.get('password')?.value
//     );
//   }
//
//   ngOnInit(): void {
//     if (this.authService.isLoggedIn() == true) {
//       this.router.navigate(['main']);
//     }
//     ///////////////////////////////////////
//     // if (this.authService.isLoggedIn() == true) {
//     //   this.http.get('http://192.168.0.117:8080/api/check_token').subscribe({
//     //     next: () => {
//     //       // return this.getToken() !== null;
//     //       this.router.navigate(['main']);
//     //       console.log('true');
//     //       return true;
//     //     },
//     //     error: (err) => {
//     //       // return this.getToken() == null;
//     //       console.log('falseeee', err);
//     //       return false;
//     //     },
//     //     complete: () => {
//     //       console.log('TRUE');
//     //     },
//     //   });
//     // }
//     ////////////////////////////////////////
//     this.authForm = new FormGroup({
//       login: new FormControl(''),
//       password: new FormControl(''),
//     });
//
//     // if (this.authService.isLoggedIn()) {
//     //   this.router.navigate(['main']);
//     // }
//   }
// }
