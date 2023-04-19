import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WrapperComponent } from './components/wrapper/wrapper.component';

const routes: Routes = [
  { path: '', component: WrapperComponent, children: [
      {path: '', loadChildren: () => import('./pages/list-of-equipment/list-of-equipment.module').then(m => m.ListOfEquipmentModule)}
    ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}