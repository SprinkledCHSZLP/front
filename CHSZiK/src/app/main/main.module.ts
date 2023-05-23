import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainRoutingModule} from "./main-routing.module";
import {WrapperComponent} from "./components/wrapper/wrapper.component";
import {HeaderComponent} from "./pages/header/header.component";
import {ListOfEquipmentComponent} from "./pages/list-of-equipment/layout/list-of-equipment.component";
import {ListOfEquipmentModule} from "./pages/list-of-equipment/list-of-equipment.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ListOfLocationComponent} from "./pages/list-of-location/layout/list-of-location.component";
import {ListOfLocationModule} from "./pages/list-of-location/list-of-location.module";

@NgModule({
  declarations: [WrapperComponent, HeaderComponent, ListOfEquipmentComponent, ListOfLocationComponent],
  imports: [CommonModule, MainRoutingModule, ListOfEquipmentModule, ReactiveFormsModule, ListOfLocationModule]
})
export class MainModule {
}
