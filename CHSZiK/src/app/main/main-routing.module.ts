import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WrapperComponent} from './components/wrapper/wrapper.component';

const routes: Routes = [
  {
    path: '', component: WrapperComponent, children: [
      {
        path: '',
        loadChildren: () => import('./pages/list-of-equipment/list-of-equipment.module').then(m => m.ListOfEquipmentModule)
      },
    ]
  },
  {
    path: '', component: WrapperComponent, children: [
      {
        path: '',
        loadChildren: () => import('./pages/list-of-location/list-of-location.module').then(m => m.ListOfLocationModule)
      }
    ]
  },
  {
    path: '', component: WrapperComponent, children: [
      {
        path: '',
        loadChildren: () => import('./pages/warehouse/warehouse.module').then(m => m.WarehouseModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {
}
