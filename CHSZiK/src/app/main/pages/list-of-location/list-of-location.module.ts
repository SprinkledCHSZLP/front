import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalComponent} from "./components/modal/modal.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ListOfLocationRoutingModule} from "./list-of-location-routing.module";
import {LocationPageComponent} from "./components/location-page/layout/location-page.component";
import {LocationItemComponent} from "./components/location-item/location-item.component";
import {
  ModalWindowAddingModelComponent
} from "./components/location-page/components/modal-window-adding-model/modal-window-adding-model.component";
import {
  ModalWindowAddingPositionComponent
} from "./components/location-page/components/modal-window-adding-position/modal-window-adding-position.component";


@NgModule({
  declarations: [ModalComponent, LocationPageComponent, LocationItemComponent, ModalWindowAddingModelComponent, ModalWindowAddingPositionComponent],
  exports: [
    ModalComponent,
    LocationItemComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, ListOfLocationRoutingModule, FormsModule]
})
export class ListOfLocationModule {
}
