import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListOfLocationComponent} from "../list-of-location/layout/list-of-location.component";
import {LocationPageComponent} from "./components/location-page/layout/location-page.component";

const routes: Routes = [
  {path: '', redirectTo: '/list-of-location/0', pathMatch: 'full'},
  {path: 'list-of-location/:id', component: ListOfLocationComponent},
  {path: 'location-page/:id', component: LocationPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListOfLocationRoutingModule {}
