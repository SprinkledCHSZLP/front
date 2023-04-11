import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  authForm!: FormGroup;
  constructor(private router: Router, private authService: AuthService) {}

  submitAuth() {
    this.authService.login(
      this.authForm.get('login')?.value,
      this.authForm.get('password')?.value
    );
  }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      login: new FormControl(''),
      password: new FormControl(''),
    });
  }
}
