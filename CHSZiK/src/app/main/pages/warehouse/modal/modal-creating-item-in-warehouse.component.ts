import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-modal-creating-item-in-warehouse',
  templateUrl: './modal-creating-item-in-warehouse.component.html',
  styleUrls: ['./modal-creating-item-in-warehouse.component.scss']
})
export class ModalCreatingItemInWarehouseComponent implements OnInit {
  constructor(private toastrService: ToastrService, public dialogRef: MatDialogRef<ModalCreatingItemInWarehouseComponent>) {
  }
  addingNewItem!: FormGroup;

  // @Output() addSend: EventEmitter<ILocation> = new EventEmitter<ILocation>()

  btnCloseModal() {
    this.dialogRef.close()
  }

  saveNewItem() {

  }

  // saveNewItem() {
  //   let component: ILocation = {
  //     name_location: this.addingNewLocation.get('name_location')?.value
  //   }
  //   this.addSend.emit(component)
  //   this.addingNewLocation.reset()
  // }

  ngOnInit(): void {
    this.addingNewItem = new FormGroup({
      name_item: new FormControl('', [Validators.required]),
      manufacturer: new FormControl(''),
      article: new FormControl('')
    })
  }

}
