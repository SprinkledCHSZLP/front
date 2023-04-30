import {Component, OnInit, Input} from '@angular/core';
import {Router} from "@angular/router";
import {ListOfEquipmentService} from "../services/list-of-equipment.service";
import {IModel} from "../../../../models/models-equipment";


@Component({
  selector: 'app-list-of-equipment',
  templateUrl: './list-of-equipment.component.html',
  styleUrls: ['./list-of-equipment.component.scss'],
})
export class ListOfEquipmentComponent implements OnInit {

  constructor(private route: Router, private listOfEquipmentService: ListOfEquipmentService) {
  }

  models: IModel[] = []
  loading = true

  submitAddingEquipment() {
    this.route.navigate(['adding-equipment', '0'])
  }

  ngOnInit(): void {
    this.listOfEquipmentService.getAllModels().subscribe((models) => {
      console.log(models)
      if (models) {
        this.models = models.data
        this.loading = false
      }
    })
  }
}
