import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { HttpClient } from '@angular/common/http';
import {CHECKTOKEN_URL} from "../../conf/conf";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  authForm!: FormGroup;
  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  submitAuth() {
    this.authService.login(
      this.authForm.get('login')?.value,
      this.authForm.get('password')?.value
    );
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn() == true) {
      this.http.get(CHECKTOKEN_URL).subscribe({
        next: () => {
          // return this.getToken() !== null;
          this.router.navigate(['list-of-equipment']);
          return true;
        },
        error: (err) => {
          // return this.getToken() == null;
          return false;
        },
        complete: () => {
          console.log('Доступ разрешён');
        }
      });
    }

    this.authForm = new FormGroup({
      login: new FormControl(''),
      password: new FormControl(''),
    });

  }
}
