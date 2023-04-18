import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainRoutingModule} from "./main-routing.module";
import {WrapperComponent} from "./components/wrapper/wrapper.component";
import {HeaderComponent} from "./pages/header/header.component";
@NgModule({
  declarations: [WrapperComponent, HeaderComponent],
  imports: [CommonModule, MainRoutingModule]
})
export class MainModule {}
