import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ILocation} from "../../../../../models/location";
import {ToastrService} from "ngx-toastr";
import {MatDialogRef} from "@angular/material/dialog";
import {ListOfLocationService} from "../../services/list-of-location.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  constructor(private toastrService: ToastrService, public dialogRef: MatDialogRef<ModalComponent>, private listOfLocationService: ListOfLocationService) {
  }
  addingNewLocation!: FormGroup;

  @Output() addSend: EventEmitter<ILocation> = new EventEmitter<ILocation>()

  btnCloseModal() {
    this.dialogRef.close()
  }

  saveNewLocation() {
    let component: ILocation = {
      name_location: this.addingNewLocation.get('name_location')?.value
    }
    this.addSend.emit(component)
    this.addingNewLocation.reset()
  }

  ngOnInit(): void {
    this.addingNewLocation = new FormGroup({
      name_location: new FormControl('', [Validators.required])
    })
  }

}
