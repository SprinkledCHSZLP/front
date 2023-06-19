import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WarehouseItemComponent} from "./components/warehouse-item/layout/warehouse-item.component";
import {WarehouseComponent} from "./layout/warehouse.component";
import {WarehouseGroupComponent} from "./components/warehouse-group/layout/warehouse-group.component";

const routes: Routes = [
  {path: '', redirectTo: '/warehouse', pathMatch: 'full'},
  {path: 'warehouse', component: WarehouseComponent},
  {path: 'warehouse-group/:id', component: WarehouseGroupComponent},
  {path: 'warehouse-item/:id', component: WarehouseItemComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WarehouseRoutingModule {}
