import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalComponent} from "./components/modal/modal.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ListOfLocationRoutingModule} from "./list-of-location-routing.module";
import {LocationPageComponent} from "./components/location-page/layout/location-page.component";


@NgModule({
  declarations: [ModalComponent, LocationPageComponent],
  exports: [
    ModalComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, ListOfLocationRoutingModule]
})
export class ListOfLocationModule {
}
