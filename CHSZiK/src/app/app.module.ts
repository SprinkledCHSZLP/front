import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/components/auth/auth.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main/components/main/main.component';
import { WorkPlansComponent } from './main/pages/work-plans/components/work-plans/work-plans.component';
import { ListOfEquipmentComponent } from './main/pages/list-of-equipment/components/list-of-equipment/list-of-equipment.component';
import { TokenInterceptor } from './interseptors/token.interceptor';
import { ErrorInterceptor } from './interseptors/error.interseptor';
import { HeaderComponent } from './main/pages/header/header.component';

@NgModule({
  declarations: [
    HeaderComponent,
    AppComponent,
    AuthComponent,
    MainComponent,
    WorkPlansComponent,
    ListOfEquipmentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
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
