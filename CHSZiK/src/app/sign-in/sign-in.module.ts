import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './layout/sign-in.component';
import { SignInRoutingModule } from './sign-in-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [SignInComponent],
  imports: [CommonModule, SignInRoutingModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
})
export class SignInModule {}
