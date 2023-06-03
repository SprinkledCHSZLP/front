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
import {MatDialogModule} from "@angular/material/dialog";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {
  LocationPageItemComponent
} from "./components/location-page/components/location-page-item/location-page-item.component";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";




@NgModule({
  declarations: [ModalComponent, LocationPageItemComponent, LocationPageComponent, LocationItemComponent, ModalWindowAddingModelComponent],
  exports: [
    ModalComponent,
    LocationItemComponent
  ],
    imports: [CommonModule, ReactiveFormsModule, ListOfLocationRoutingModule, FormsModule, MatDialogModule, PdfViewerModule, MatTooltipModule, MatIconModule, MatButtonModule, MatInputModule, MatMenuModule, MatProgressSpinnerModule]
})
export class ListOfLocationModule {
}
