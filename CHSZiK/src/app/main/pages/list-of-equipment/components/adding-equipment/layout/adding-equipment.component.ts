import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {IPart} from "../../../../../../models/part-equipment";
import {ListOfEquipmentService} from "../../../services/list-of-equipment.service";
import {HttpClient} from "@angular/common/http";
import {AddingComponentService} from "../services/adding-component.service";
import {IModel} from "../../../../../../models/models-equipment";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-adding-equipment',
  templateUrl: './adding-equipment.component.html',
  styleUrls: ['./adding-equipment.component.scss']
})

export class AddingEquipmentComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private route: ActivatedRoute, private listOfEquipmentService: ListOfEquipmentService,
              private http: HttpClient, private addingComponentService: AddingComponentService) {
  }


  sub$: Subscription = new Subscription()

  part: IPart[] = []


  btnBack() {
    window.history.back()
  }

  parent_equipment_id: any

  getAllPart() {
    this.listOfEquipmentService.getAllPart(this.parent_equipment_id).subscribe((part) => {
      console.log(part)
      if (part) {
        this.part = part.data
      }
    })
  }


  addingComponent(component: IPart) {

    this.addingComponentService.addingComponent({
      ...component, parent_equipment_id: this.parent_equipment_id
    }).subscribe(() => {
      this.getAllPart()
    })


  }

  ngOnInit() {
    this.sub$.add(
      this.route.params.subscribe(params => {
        this.parent_equipment_id = params['id']
        this.getAllPart()
      })
    )
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe()
  }
}
