import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Router} from "@angular/router";
import {ListOfEquipmentService} from "../services/list-of-equipment.service";
import {IModel} from "../../../../models/models-equipment";
import {Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-list-of-equipment',
  templateUrl: './list-of-equipment.component.html',
  styleUrls: ['./list-of-equipment.component.scss'],
})
export class ListOfEquipmentComponent implements OnInit, OnDestroy {

  constructor(private route: Router, private listOfEquipmentService: ListOfEquipmentService, private toastrService: ToastrService) {
  }

  sub$: Subscription = new Subscription()
  models: IModel[] = []
  loading = true

  submitAddingEquipment() {
    this.route.navigate(['adding-equipment', '0'])
  }

  getAllModels() {
    this.sub$.add(this.listOfEquipmentService.getAllModels().subscribe((models) => {
      console.log(models)
      if (models) {
        this.models = models.data
        this.loading = false
      }
    }))
  }

  getModels(id: number) {
    this.listOfEquipmentService.deleteModel(id).subscribe(() => {
      this.toastrService.success('Модель удалена')
      this.getAllModels()
    })
  }

  ngOnInit(): void {
    this.getAllModels()
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe()
  }
}
