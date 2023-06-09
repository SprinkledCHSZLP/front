import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IPart} from "../../../../../../../models/part-equipment";

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
    this.addingForm.get('equipment_name')?.reset()
    this.addingForm.get('position_on_plan')?.reset()
    this.addingForm.get('have_equipment')?.reset(false)
    this.addingForm.get('service')?.reset(false)
  }

  ngOnInit(): void {

    this.addingForm = new FormGroup({
      position_on_plan: new FormControl(''),
      equipment_name: new FormControl('', [Validators.required]),
      have_equipment: new FormControl(false),
      service: new FormControl(false),
    });
  }
}
