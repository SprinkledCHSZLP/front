import {Component, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {IPart} from "../../../../../../models/part-equipment";
import {ListOfEquipmentService} from "../../../services/list-of-equipment.service";
import {HttpClient} from "@angular/common/http";
import {AddingComponentService} from "../services/adding-component.service";
import {Subscription} from "rxjs";
import {IParentPart} from "../../../../../../models/parent-part-equipment";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-adding-equipment',
  templateUrl: './adding-equipment.component.html',
  styleUrls: ['./adding-equipment.component.scss']
})

export class AddingEquipmentComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private route: ActivatedRoute, private listOfEquipmentService: ListOfEquipmentService,
              private http: HttpClient, private addingComponentService: AddingComponentService) {
  }

  addingNewModelForm!: FormGroup;

  sub$: Subscription = new Subscription()
  part: IPart[] = []
  parent: IParentPart
  parent_equipment_id: number
  isNew: boolean = true

  btnBack() {
    window.history.back()
  }

  btnAddingNewModel() {
    this.listOfEquipmentService.addingNewParentModel(
      this.addingNewModelForm.get('equipment_name')?.value,
      this.addingNewModelForm.get('image')?.value
    )
  }

  getAllPart() {
    this.listOfEquipmentService.getAllPart(this.parent_equipment_id).subscribe((part) => {
      if (part) {
        this.part = part.data
        console.log("Сработал getAllPart " + this.part)
      }
    })
  }

  getParentPart() {
    this.listOfEquipmentService.getParentPart(this.parent_equipment_id).subscribe((parent) => {
      if (parent) {
        this.parent = parent.data
        console.log("Сработал getParentPartt " + this.parent)
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

  addingParentPart() {
//редактирование
  }

  ifNotIsNew() {
    this.sub$.add(
      this.route.params.subscribe(params => {
        this.parent_equipment_id = params['id']
        this.getAllPart()
        this.getParentPart()
      })
    )
  }

  ngOnInit() {

    this.addingNewModelForm = new FormGroup({
      equipment_name: new FormControl(''),
      image: new FormControl('')
    })

    this.route.params.subscribe(params => {
      this.parent_equipment_id = params['id']
      if (this.parent_equipment_id != 0) {
        this.isNew = false
      }
    })

    if(this.isNew == false) {
      this.ifNotIsNew()
    }
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe()
  }
}
