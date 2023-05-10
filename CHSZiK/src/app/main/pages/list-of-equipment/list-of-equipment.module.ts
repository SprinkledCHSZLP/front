/*import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListOfEquipmentRoutingModule} from "./list-of-equipment-routing.module";
import {AddingEquipmentComponent} from "./components/adding-equipment/layout/adding-equipment.component";

import {
  SettingComponentComponent
} from "./components/adding-equipment/components/setting-component/setting-component.component";
import {
  AddingComponentComponent
} from "./components/adding-equipment/components/adding-component/adding-component.component";
import {ListOfEquipmentModelsComponent} from "./components/list-of-equipment-models/list-of-equipment-models.component";
import {
  MaintenanceSheetEditingComponent
} from "./components/adding-equipment/components/maintenance-sheet-editing/maintenance-sheet-editing.component";
@NgModule({
  declarations: [AddingEquipmentComponent, AddingComponentComponent, SettingComponentComponent, ListOfEquipmentModelsComponent, MaintenanceSheetEditingComponent],
  exports: [
    ListOfEquipmentModelsComponent
  ],
  imports: [CommonModule, ListOfEquipmentRoutingModule]
})
export class ListOfEquipmentModule {}
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListOfEquipmentRoutingModule} from "./list-of-equipment-routing.module";
import {AddingEquipmentComponent} from "./components/adding-equipment/layout/adding-equipment.component";

import {
  SettingComponentComponent
} from "./components/adding-equipment/components/setting-component/layout/setting-component.component";
import {
  AddingComponentComponent
} from "./components/adding-equipment/components/adding-component/adding-component.component";
import {ListOfEquipmentModelsComponent} from "./components/list-of-equipment-models/list-of-equipment-models.component";
import {
  MaintenanceSheetEditingComponent
} from "./components/adding-equipment/components/setting-component/components/maintenance-sheet-editing/maintenance-sheet-editing.component";
import {ReactiveFormsModule} from "@angular/forms";
@NgModule({
  declarations: [AddingEquipmentComponent, AddingComponentComponent, SettingComponentComponent, ListOfEquipmentModelsComponent, MaintenanceSheetEditingComponent],
  exports: [
    ListOfEquipmentModelsComponent
  ],
    imports: [CommonModule, ListOfEquipmentRoutingModule, ReactiveFormsModule]
})
export class ListOfEquipmentModule {}
