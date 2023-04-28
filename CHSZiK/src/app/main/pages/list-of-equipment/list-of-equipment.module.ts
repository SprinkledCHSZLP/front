import { NgModule } from '@angular/core';
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
@NgModule({
  declarations: [AddingEquipmentComponent, AddingComponentComponent, SettingComponentComponent, ListOfEquipmentModelsComponent],
  exports: [
    ListOfEquipmentModelsComponent
  ],
  imports: [CommonModule, ListOfEquipmentRoutingModule]
})
export class ListOfEquipmentModule {}
