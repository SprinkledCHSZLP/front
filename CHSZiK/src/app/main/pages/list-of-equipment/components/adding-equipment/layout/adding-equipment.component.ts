import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {IPart} from "../../../../../../models/part-equipment";
import {ListOfEquipmentService} from "../../../services/list-of-equipment.service";
import {HttpClient} from "@angular/common/http";
import {AddingComponentService} from "../services/adding-component.service";

@Component({
  selector: 'app-adding-equipment',
  templateUrl: './adding-equipment.component.html',
  styleUrls: ['./adding-equipment.component.scss']
})

export class AddingEquipmentComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private listOfEquipmentService: ListOfEquipmentService,
              private http: HttpClient, private addingComponentService: AddingComponentService) {
  }

  part: IPart[] = []


  btnBack() {
    this.router.navigate([''])
  }

  parent_equipment_id: any

  isNew: boolean = true

  getIdParent() {
    this.route.params.subscribe(params => {
      // if (params['id'] !== '0') this.isNew = false
      this.parent_equipment_id = params['id']
      console.log(this.parent_equipment_id)
    })
  }


  addingComponent(component: IPart) {

    this.addingComponentService.addingComponent({
      ...component, parent_equipment_id: this.parent_equipment_id
    })


  }

  ngOnInit() {
    this.getIdParent()

    this.listOfEquipmentService.getAllPart(this.parent_equipment_id).subscribe((part) => {
      console.log(part)
      if (part) {
        this.part = part.data
      }
    })
  }
}
