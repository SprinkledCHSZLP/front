import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/components/auth/auth.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main/components/main/main.component';
import { WorkPlansComponent } from './main/pages/work-plans/components/work-plans/work-plans.component';
import { TokenInterceptor } from './interseptors/token.interceptor';
import { ErrorInterceptor } from './interseptors/error.interseptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListOfEquipmentComponent } from './main/pages/list-of-equipment/list-of-equipment.component';
import { HeaderComponent } from './main/pages/header/header.component';
import { AddingEquipmentComponent } from './main/pages/list-of-equipment/components/adding-equipment/adding-equipment.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MainComponent,
    WorkPlansComponent,
    ListOfEquipmentComponent,
    HeaderComponent,
    AddingEquipmentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
