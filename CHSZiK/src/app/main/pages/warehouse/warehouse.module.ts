import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WarehouseRoutingModule} from "./warehouse-routing.module";
import {ModalCreatingItemInWarehouseComponent} from "./components/modal/modal-creating-item-in-warehouse.component";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {WarehouseItemComponent} from "./components/warehouse-item/layout/warehouse-item.component";
import {
  ModalReplenishmentComponent
} from "./components/warehouse-item/components/modal-replenishment/modal-replenishment.component";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatAutocompleteModule} from "@angular/material/autocomplete";

@NgModule({
  declarations: [ModalCreatingItemInWarehouseComponent, WarehouseItemComponent, ModalReplenishmentComponent],
  exports: [ModalCreatingItemInWarehouseComponent],
    imports: [CommonModule, WarehouseRoutingModule, MatButtonModule, MatTooltipModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule, MatCheckboxModule, MatProgressSpinnerModule, MatAutocompleteModule]
})
export class WarehouseModule {
}
