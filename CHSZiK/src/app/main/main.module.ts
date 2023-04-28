import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainRoutingModule} from "./main-routing.module";
import {WrapperComponent} from "./components/wrapper/wrapper.component";
import {HeaderComponent} from "./pages/header/header.component";
import {ListOfEquipmentComponent} from "./pages/list-of-equipment/layout/list-of-equipment.component";
import {ListOfEquipmentModule} from "./pages/list-of-equipment/list-of-equipment.module";

@NgModule({
  declarations: [WrapperComponent, HeaderComponent, ListOfEquipmentComponent],
  imports: [CommonModule, MainRoutingModule, ListOfEquipmentModule]
})
export class MainModule {
}
