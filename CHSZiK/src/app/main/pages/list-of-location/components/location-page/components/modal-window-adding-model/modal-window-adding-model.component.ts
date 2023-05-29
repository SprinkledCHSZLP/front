import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ListOfEquipmentService} from "../../../../../list-of-equipment/services/list-of-equipment.service";
import {IModel} from "../../../../../../../models/models-equipment";
import {ListOfLocationService} from "../../../../services/list-of-location.service";
import {IPosition} from "../../../../../../../models/position";
import {FormControl, FormGroup, Validators} from "@angular/forms";

interface IPositionData {
  locationId: string
}

@Component({
  selector: 'app-modal-window-adding-model',
  templateUrl: './modal-window-adding-model.component.html',
  styleUrls: ['./modal-window-adding-model.component.scss']
})


export class ModalWindowAddingModelComponent implements OnInit {
  constructor(private listOfLocationService: ListOfLocationService, private listOfEquipmentService: ListOfEquipmentService, public dialogRef: MatDialogRef<ModalWindowAddingModelComponent>, @Inject(MAT_DIALOG_DATA) public data: IPositionData) {
  }

  equipment_id: number
  modelsArr: IModel[] = []
  positionsArr: IPosition[] = []
  isModels: boolean = true
  locationId: number

  addingPositionForm!: FormGroup;

  getAllModels() {
    this.listOfEquipmentService.getAllModels().subscribe((modelsArr) => {
      console.log(modelsArr)
      if (modelsArr) {
        this.modelsArr = modelsArr.data
      }
    })
  }

  back() {
    this.isModels = true
  }


  btnCloseModal() {
   this.dialogRef.close()
  }

  addingNewPosition() {
    let component: {equipment_id: number, position: string} = {
      equipment_id: this.equipment_id,
      position: this.addingPositionForm.get('position')?.value
    }
    this.listOfLocationService.addingNewPosition(component).subscribe(() => {
      this.listOfLocationService.getPosition(this.equipment_id).subscribe((positionsArr) => {
        if(positionsArr) {
          this.positionsArr = positionsArr.data
        }
      })
    })

  }

  openPositionsOfModel(modelId: number) {
    this.listOfLocationService.getPosition(modelId).subscribe((positionsArr) => {
      if(positionsArr) {
        this.positionsArr = positionsArr.data
      }
    })
    this.equipment_id = modelId
    this.isModels = false
  }

  addPositionInLocation(positionId: number){
    let component: {id: number, locations_id: string} = {
      id: positionId,
      locations_id: this.data.locationId
    }
    this.listOfLocationService.addPositionInLocation(component).subscribe(() => {
      this.openPositionsOfModel(this.equipment_id)
    })
  }

  ngOnInit(): void {

    this.addingPositionForm = new FormGroup({
      position: new FormControl('', [Validators.required])
    })
    this.getAllModels()
  }
}
