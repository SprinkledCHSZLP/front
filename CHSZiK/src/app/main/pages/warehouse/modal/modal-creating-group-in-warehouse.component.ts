import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-modal-creating-group-in-warehouse',
  templateUrl: './modal-creating-group-in-warehouse.component.html',
  styleUrls: ['./modal-creating-group-in-warehouse.component.scss']
})
export class ModalCreatingGroupInWarehouseComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ModalCreatingGroupInWarehouseComponent>) {
  }
  unitMap = new Map<string, number>([
    ['Вес', 1],
    ['Объём', 2],
    ['Длина', 3]
  ])

  disableSelect = new FormControl(true);
  addingNewGroup!: FormGroup;
  @Output() send: EventEmitter<{name: string, type_measure_units_id?: number}> = new EventEmitter<{name: string, type_measure_units_id?: number}>()

  btnCloseModal() {
    this.dialogRef.close()
  }

  saveNewGroup() {
    let component: {name: string, type_measure_units_id?: number} = {
      name: this.addingNewGroup.get('name')?.value,
      type_measure_units_id: this.unitMap.get(this.addingNewGroup.get('type_measure_units_id')?.value)
    }
    if(this.disableSelect.value == false) {
      component.type_measure_units_id = undefined
    }
    this.send.emit(component)
    this.dialogRef.close()
  }


  ngOnInit(): void {
    this.addingNewGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      type_measure_units_id: new FormControl('')
    })
  }
}
