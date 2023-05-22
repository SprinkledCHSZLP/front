import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {IPart} from "../../../../../../../models/part-equipment";
import {ListOfEquipmentService} from "../../../../services/list-of-equipment.service";

@Component({
  selector: 'app-adding-component',
  templateUrl: './adding-component.component.html',
  styleUrls: ['./adding-component.component.scss']
})
export class AddingComponentComponent implements OnInit {

  addingForm!: FormGroup

  constructor() {
  }

  @Output() send: EventEmitter<IPart> = new EventEmitter<IPart>()

  saveComponent() {
    let component: IPart = {
      position_on_plan: this.addingForm.get('position_on_plan')?.value,
      equipment_name: this.addingForm.get('equipment_name')?.value,
      have_equipment: this.addingForm.get('have_equipment')?.value,
      service: this.addingForm.get('service')?.value,
    }
    this.send.emit(component)
  }

  ngOnInit(): void {

    this.addingForm = new FormGroup({
      position_on_plan: new FormControl(''),
      equipment_name: new FormControl(''),
      have_equipment: new FormControl(true || false),
      service: new FormControl(true || false),
    });

  }

}
