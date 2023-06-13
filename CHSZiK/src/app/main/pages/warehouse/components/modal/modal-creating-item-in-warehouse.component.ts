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
  @Output() send: EventEmitter<{name: string, manufacturer: string, article: string, type_measure_units_id?: number}> = new EventEmitter<{name: string, manufacturer: string, article: string, type_measure_units_id?: number}>()
  unitMap = new Map<string, number>([
    ['Вес', 1],
    ['Объём', 2],
    ['Длина', 3]
  ])

  disableSelect = new FormControl(true);

  btnCloseModal() {
    this.dialogRef.close()
  }

  saveNewItem() {
    let component: {name: string, manufacturer: string, article: string, type_measure_units_id?: number} = {
      name: this.addingNewItem.get('name')?.value,
      manufacturer: this.addingNewItem.get('manufacturer')?.value,
      article: this.addingNewItem.get('article')?.value,
      type_measure_units_id: this.unitMap.get(this.addingNewItem.get('type_measure_units_id')?.value)
    }
    if(this.disableSelect.value == false) {
      component.type_measure_units_id = undefined
    }
    this.send.emit(component)
    this.dialogRef.close()
  }


  ngOnInit(): void {
    this.addingNewItem = new FormGroup({
      name: new FormControl('', [Validators.required]),
      manufacturer: new FormControl(''),
      article: new FormControl(''),
      type_measure_units_id: new FormControl('')
      // group: new FormControl('', [Validators.required])
    })
  }

}
