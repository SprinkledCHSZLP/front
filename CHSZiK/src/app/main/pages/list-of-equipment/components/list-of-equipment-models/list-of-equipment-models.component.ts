import { Component, Input} from '@angular/core';
import {IModel} from "../../../../../models/models-equipment";
import {Router} from "@angular/router";


@Component({
  selector: 'app-list-of-equipment-models',
  templateUrl: './list-of-equipment-models.component.html',
  styleUrls: ['./list-of-equipment-models.component.scss'],
})
export class ListOfEquipmentModelsComponent {

  constructor(private router: Router) {
  }

  @Input() models: IModel

  openSettings() {
    this.router.navigate(['adding-equipment', this.models.id])
  }
}
