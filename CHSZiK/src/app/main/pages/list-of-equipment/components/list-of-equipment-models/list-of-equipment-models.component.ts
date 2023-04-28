import { Component, Input} from '@angular/core';
import {IModel} from "../../../../../models/models-equipment";


@Component({
  selector: 'app-list-of-equipment-models',
  templateUrl: './list-of-equipment-models.component.html',
  styleUrls: ['./list-of-equipment-models.component.scss'],
})
export class ListOfEquipmentModelsComponent {

  @Input() models: IModel
}
