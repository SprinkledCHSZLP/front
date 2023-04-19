import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FromInAuthGuard} from './guards/from-in-auth.guard';


const routes: Routes = [
  // {
  //   path: 'main/list-of-equipment',
  //   canActivate: [FromInAuthGuard],
  //   canDeactivate: [FromInAuthGuard],
  //   component: ListOfEquipmentComponent,
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
    canActivate: [FromInAuthGuard],
    canDeactivate: [FromInAuthGuard],
    // canActivate: [] гуард
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
