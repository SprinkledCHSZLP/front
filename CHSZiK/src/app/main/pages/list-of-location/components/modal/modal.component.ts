import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

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

  btnCloseModal() {
    return this.send.emit(false)
  }

  ngOnInit(): void {
    this.addingNewLocation = new FormGroup({
      location_name: new FormControl('')
    })
  }

}
