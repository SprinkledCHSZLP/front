import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListOfEquipmentRoutingModule} from "./list-of-equipment-routing.module";
import {AddingEquipmentComponent} from "./components/adding-equipment/layout/adding-equipment.component";
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {FormsModule} from '@angular/forms';
import {NgxExtendedPdfViewerModule} from "ngx-extended-pdf-viewer";
import {
  SettingComponentComponent
} from "./components/adding-equipment/components/setting-component/layout/setting-component.component";
import {
  AddingComponentComponent
} from "./components/adding-equipment/components/adding-component/adding-component.component";
import {ListOfEquipmentModelsComponent} from "./components/list-of-equipment-models/list-of-equipment-models.component";
import {
  MaintenanceSheetEditingComponent
} from "./components/adding-equipment/components/setting-component/components/maintenance-sheet-editing/layout/maintenance-sheet-editing.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ModalPositionComponent} from "./components/modal-position/modal-position.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {
  ViewingModelFilesComponent
} from "./components/adding-equipment/components/viewing-model-files/viewing-model-files.component";
import {MatAutocompleteModule} from "@angular/material/autocomplete";

@NgModule({
  declarations: [ModalPositionComponent, AddingEquipmentComponent, AddingComponentComponent, SettingComponentComponent, ListOfEquipmentModelsComponent, MaintenanceSheetEditingComponent, ViewingModelFilesComponent],
  exports: [
    ListOfEquipmentModelsComponent
  ],
    imports: [CommonModule, ListOfEquipmentRoutingModule, ReactiveFormsModule, PdfViewerModule, FormsModule, NgxExtendedPdfViewerModule, MatDialogModule, MatButtonModule, MatTooltipModule, MatIconModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatProgressSpinnerModule, MatAutocompleteModule]
})
export class ListOfEquipmentModule {
}
