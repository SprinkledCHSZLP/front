import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WarehouseRoutingModule} from "./warehouse-routing.module";
import {ModalCreatingItemInWarehouseComponent} from "./modal/modal-creating-item-in-warehouse.component";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {WarehouseItemComponent} from "./components/warehouse-item/layout/warehouse-item.component";

@NgModule({
  declarations: [ModalCreatingItemInWarehouseComponent, WarehouseItemComponent],
  exports: [ModalCreatingItemInWarehouseComponent],
  imports: [CommonModule, WarehouseRoutingModule, MatButtonModule, MatTooltipModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule]
})
export class WarehouseModule {
}
