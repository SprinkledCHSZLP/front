import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ListOfLocationService} from "../../../list-of-location/services/list-of-location.service";
import {ListOfEquipmentService} from "../../services/list-of-equipment.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IPosition} from "../../../../../models/position";

interface IModelsData {
  modelsId: number
}

@Component({
  selector: 'app-modal-position',
  templateUrl: './modal-position.component.html',
  styleUrls: ['./modal-position.component.scss']
})
export class ModalPositionComponent implements OnInit {
  constructor(private listOfLocationService: ListOfLocationService, private listOfEquipmentService: ListOfEquipmentService, public dialogRef: MatDialogRef<ModalPositionComponent>, @Inject(MAT_DIALOG_DATA) public data: IModelsData) {
  }
  positionsArr: IPosition[] = []
  addingPositionForm!: FormGroup;

  btnCloseModal() {
    this.dialogRef.close()
  }

  deletePosition(group_id: string) {
    this.listOfEquipmentService.deletePosition(group_id).subscribe(() => {
      this.openPositions(this.data.modelsId)
    })
  }

  addingNewPosition() {
    let component: {equipment_id: number, position: string} = {
      equipment_id: this.data.modelsId,
      position: this.addingPositionForm.get('position')?.value
    }
    this.listOfLocationService.addingNewPosition(component).subscribe(() => {
      this.openPositions(this.data.modelsId)
    })

  }

  openPositions(modelId: number) {
    this.listOfEquipmentService.getAllPosition(modelId).subscribe((positionsArr) => {
      if(positionsArr) {
        this.positionsArr = positionsArr.data
      }
    })
  }

  ngOnInit(): void {
    this.addingPositionForm = new FormGroup({
      position: new FormControl('', [Validators.required])
    })

    this.openPositions(this.data.modelsId)
  }

}
