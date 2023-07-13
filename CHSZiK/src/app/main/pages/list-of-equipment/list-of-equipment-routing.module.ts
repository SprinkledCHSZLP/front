import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListOfEquipmentComponent} from "./layout/list-of-equipment.component";
import {AddingEquipmentComponent} from "./components/adding-equipment/layout/adding-equipment.component";
import {
  MaintenanceSheetEditingComponent
} from "./components/adding-equipment/components/maintenance-sheet-editing/layout/maintenance-sheet-editing.component";

const routes: Routes = [
  {path: '', redirectTo: '/list-of-equipment', pathMatch: 'full'},
  {path: 'list-of-equipment', component: ListOfEquipmentComponent},
  {path: 'adding-equipment/:id', component: AddingEquipmentComponent},
  {path: 'maintenance-sheet-editing/:id', component: MaintenanceSheetEditingComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListOfEquipmentRoutingModule {}
