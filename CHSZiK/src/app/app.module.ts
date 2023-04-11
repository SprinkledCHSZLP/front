import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/components/auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main/components/main/main.component';
import { WorkPlansComponent } from './main/pages/work-plans/components/work-plans/work-plans.component';
import { ListOfEquipmentComponent } from './main/pages/list-of-equipment/components/list-of-equipment/list-of-equipment.component';

@NgModule({
  declarations: [AppComponent, AuthComponent, MainComponent, WorkPlansComponent, ListOfEquipmentComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
