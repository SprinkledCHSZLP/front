import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WarehouseComponent} from "./layout/warehouse.component";
import {WarehouseItemComponent} from "./components/warehouse-item/layout/warehouse-item.component";

const routes: Routes = [
  {path: '', redirectTo: '/warehouse', pathMatch: 'full'},
  {path: 'warehouse', component: WarehouseComponent},
  {path: 'warehouse-item/:id', component: WarehouseItemComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WarehouseRoutingModule {}
