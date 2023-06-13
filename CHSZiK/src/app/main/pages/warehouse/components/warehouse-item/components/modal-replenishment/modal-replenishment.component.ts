import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ITypeSpareParts} from "../../../../../../../models/type-spare-part";

@Component({
  selector: 'app-modal-replenishment',
  templateUrl: './modal-replenishment.component.html',
  styleUrls: ['./modal-replenishment.component.scss']
})
export class ModalReplenishmentComponent implements OnInit {
  constructor(private toastrService: ToastrService, public dialogRef: MatDialogRef<ModalReplenishmentComponent>, @Inject(MAT_DIALOG_DATA) public data: number) {
  }
  @Output() send: EventEmitter<{measure_units_id?: number, units: number}> = new EventEmitter<{measure_units_id?: number, units: number}>()
  replenishmentForm!: FormGroup;
  unitMap = new Map<string, number>([
    ['Килограмм', 1],
    ['Грамм', 2],
    ['Литр', 3],
    ['Миллилитр', 4],
    ['Метр', 5],
    ['Сантиметр', 6]
  ])

  btnCloseModal() {
    this.dialogRef.close()
  }

  replenishment() {
    let component: {measure_units_id?: number, units: number} = {
      measure_units_id: this.unitMap.get(this.replenishmentForm.get('measure_units_id')?.value),
      units: this.replenishmentForm.get('units')?.value,
    }
    this.send.emit(component)
    this.dialogRef.close()
  }


  ngOnInit(): void {
    this.replenishmentForm = new FormGroup({
      measure_units_id: new FormControl(''),
      units: new FormControl('', Validators.required)
    })
  }

}
