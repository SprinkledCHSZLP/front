import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/components/auth/auth.component';
import { FromInAuthGuard } from './guards/from-in-auth.guard';
import { ListOfEquipmentComponent } from './main/pages/list-of-equipment/list-of-equipment.component';
import { AddingEquipmentComponent } from './main/pages/list-of-equipment/components/adding-equipment/adding-equipment.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  {
    path: 'main',
    redirectTo: 'main/list-of-equipment',
    pathMatch: 'full',
  },
  {
    path: 'main/list-of-equipment',
    canActivate: [FromInAuthGuard],
    canDeactivate: [FromInAuthGuard],
    component: ListOfEquipmentComponent,
  },
  {
    path: 'main/list-of-equimpent/adding',
    component: AddingEquipmentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
