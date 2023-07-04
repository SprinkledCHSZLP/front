import {NgModule} from '@angular/core';
import {EquipmentPositionRoutingModule} from "./equipment-position-routing.module";
import {SettingComponentComponent} from "./components/setting-component/layout/setting-component.component";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";
import {ViewingFilesPositionComponent} from "./components/viewing-files-position/viewing-files-position.component";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {NgIf} from "@angular/common";

@NgModule({
  declarations: [SettingComponentComponent, ViewingFilesPositionComponent],
  exports: [
    SettingComponentComponent,
    ViewingFilesPositionComponent
  ],
  imports: [EquipmentPositionRoutingModule, MatTooltipModule, MatButtonModule, PdfViewerModule, NgIf]
})
export class EquipmentPositionModule {
}
