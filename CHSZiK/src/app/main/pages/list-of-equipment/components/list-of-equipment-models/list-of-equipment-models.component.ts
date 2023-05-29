import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IModel} from "../../../../../models/models-equipment";
import {Router} from "@angular/router";
import {ListOfEquipmentService} from "../../services/list-of-equipment.service";


@Component({
  selector: 'app-list-of-equipment-models',
  templateUrl: './list-of-equipment-models.component.html',
  styleUrls: ['./list-of-equipment-models.component.scss'],
})
export class ListOfEquipmentModelsComponent implements OnInit{

  constructor(private router: Router, private listOfEquipmentService: ListOfEquipmentService) {
  }

  pdfStrModel: boolean
  searchStringModel = '.pdf'


  @Output() send: EventEmitter<number> = new EventEmitter<number>()

  @Input() models: IModel

  openSettings() {
    this.router.navigate(['adding-equipment', this.models.id])
  }

  openPositionModal() {

  }

  deleteModel() {
    this.send.emit(this.models.id)
  }

  ngOnInit(): void {
    if(this.models.image_plan_reference) {
      this.pdfStrModel = this.models.image_plan_reference.includes(this.searchStringModel)
    }

  }
}
