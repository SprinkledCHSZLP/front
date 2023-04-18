import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { ListOfEquipmentComponent } from './list-of-equipment/list-of-equipment.component';
import { AddingEquipmentComponent } from './list-of-equipment/components/adding-equipment/adding-equipment.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    // ListOfEquipmentComponent,
    // AddingEquipmentComponent,
    // HeaderComponent,
  ],
  imports: [CommonModule, PagesRoutingModule],
})
export class PagesModule {}
