import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListOfEquipmentComponent} from "./layout/list-of-equipment.component";
import {AddingEquipmentComponent} from "./components/adding-equipment/layout/adding-equipment.component";

const routes: Routes = [
  {path: '', redirectTo: '/list-of-equipment', pathMatch: 'full'},
  {path: 'list-of-equipment', component: ListOfEquipmentComponent},
  {path: 'adding-equipment', component: AddingEquipmentComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListOfEquipmentRoutingModule {}
