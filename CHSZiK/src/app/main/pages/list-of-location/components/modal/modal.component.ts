import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ILocation} from "../../../../../models/location";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  constructor() {
  }
  addingNewLocation!: FormGroup;

  @Output() send: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() addSend: EventEmitter<ILocation> = new EventEmitter<ILocation>()

  btnCloseModal() {
    return this.send.emit(false)
  }

  saveNewLocation() {
    let component: ILocation = {
      name_location: this.addingNewLocation.get('name_location')?.value
    }
    this.addSend.emit(component)

  }

  ngOnInit(): void {
    this.addingNewLocation = new FormGroup({
      name_location: new FormControl('')
    })
  }

}
