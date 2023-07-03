import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EquipmentPositionComponent} from "./layout/equipment-position.component";

const routes: Routes = [
  {path: '', redirectTo: '/equipment-position', pathMatch: 'full'},
  {path: 'equipment-position/:id', component: EquipmentPositionComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipmentPositionRoutingModule {}
