import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOfEquipmentComponent } from './list-of-equipment/components/list-of-equipment/list-of-equipment.component';

const routes: Routes = [{ path: '', component: ListOfEquipmentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
