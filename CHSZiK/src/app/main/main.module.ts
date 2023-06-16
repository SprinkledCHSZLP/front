import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainRoutingModule} from "./main-routing.module";
import {WrapperComponent} from "./components/wrapper/wrapper.component";
import {HeaderComponent} from "./pages/header/header.component";
import {ListOfEquipmentComponent} from "./pages/list-of-equipment/layout/list-of-equipment.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ListOfLocationComponent} from "./pages/list-of-location/layout/list-of-location.component";
import {ListOfLocationModule} from "./pages/list-of-location/list-of-location.module";
import {MatButtonModule} from "@angular/material/button";
import {MatChipsModule} from "@angular/material/chips";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {WarehouseComponent} from "./pages/warehouse/layout/warehouse.component";
import {WarehouseModule} from "./pages/warehouse/warehouse.module";
import {MatTooltipModule} from "@angular/material/tooltip";
import {ListOfEquipmentModule} from "./pages/list-of-equipment/list-of-equipment.module";
import {ModalConfirmationComponent} from "./pages/modal-confirmation/modal-confirmation.component";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [WrapperComponent, HeaderComponent, ListOfEquipmentComponent, ListOfLocationComponent, WarehouseComponent, ModalConfirmationComponent],
  imports: [CommonModule, MainRoutingModule, ReactiveFormsModule, ListOfLocationModule, WarehouseModule, MatButtonModule, MatChipsModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatIconModule, MatProgressSpinnerModule, MatTooltipModule, ListOfEquipmentModule, MatDialogModule]
})
export class MainModule {
}
