import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainRoutingModule} from "./main-routing.module";
import {WrapperComponent} from "./components/wrapper/wrapper.component";
import {HeaderComponent} from "./pages/header/header.component";
import {ListOfEquipmentComponent} from "./pages/list-of-equipment/layout/list-of-equipment.component";
@NgModule({
  declarations: [WrapperComponent, HeaderComponent, ListOfEquipmentComponent],
  imports: [CommonModule, MainRoutingModule]
})
export class MainModule {}
