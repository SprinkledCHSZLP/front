import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/components/auth/auth.component';
import { FromInAuthGuard } from './guards/from-in-auth.guard';


const routes: Routes = [
  // { path: '', redirectTo: 'auth', pathMatch: 'full' },
  // { path: 'auth', component: AuthComponent },
  // {
  //   path: 'main',
  //   redirectTo: 'main/list-of-equipment',
  //   pathMatch: 'full',
  // },
  // {
  //   path: 'main/list-of-equipment',
  //   canActivate: [FromInAuthGuard],
  //   canDeactivate: [FromInAuthGuard],
  //   component: ListOfEquipmentComponent,
  // },
  // {
  //   path: 'main/list-of-equipment/adding',
  //   component: AddingEquipmentComponent,
  // },
  {
    path: 'sign-in',
    loadChildren: () =>
      import('./sign-in/sign-in.module').then((m) => m.SignInModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./main/main.module').then((m) => m.MainModule),
    // canActivate: [] гуард
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
