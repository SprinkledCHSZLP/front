import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ListOfEquipmentService} from "../../../../../list-of-equipment/services/list-of-equipment.service";
import {IModel} from "../../../../../../../models/models-equipment";
import {ListOfLocationService} from "../../../../services/list-of-location.service";
import {IPosition} from "../../../../../../../models/position";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {
  AddingComponentService
} from "../../../../../list-of-equipment/components/adding-equipment/services/adding-component.service";
import {ToastrService} from "ngx-toastr";

interface IPositionData {
  locationId: string
}

@Component({
  selector: 'app-modal-window-adding-model',
  templateUrl: './modal-window-adding-model.component.html',
  styleUrls: ['./modal-window-adding-model.component.scss']
})

export class ModalWindowAddingModelComponent implements OnInit {
  constructor(private addingComponentService: AddingComponentService, private router: Router, private listOfLocationService: ListOfLocationService, private listOfEquipmentService: ListOfEquipmentService, public dialogRef: MatDialogRef<ModalWindowAddingModelComponent>, @Inject(MAT_DIALOG_DATA) public data: IPositionData, private toastrService: ToastrService) {
  }

  modelsArr: IModel[] = []
  positionsArr: IPosition[] = []
  equipment_id: number
  isModels: boolean = true
  locationId: number
  addingPositionForm!: FormGroup;
  addingModelForm!: FormGroup;
  @Output() sendAdd: EventEmitter<{id: number, locations_id: string}> = new EventEmitter<{id: number, locations_id: string}>()

  getAllModels() {
    this.listOfEquipmentService.getAllModels().subscribe((modelsArr) => {
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
          this.toastrService.success('Позиция создана')
          this.addingPositionForm.reset()
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
    this.sendAdd.emit(component)
    this.listOfLocationService.addPositionInLocation(component).subscribe(() => {
      this.openPositionsOfModel(this.equipment_id)
      this.listOfLocationService.update$.next(null)
      this.toastrService.success('Позиция добавлена')
    })
  }

  openAddingEquipment(equipmentId: number) {
    this.router.navigate(['adding-equipment/' + equipmentId])
    this.dialogRef.close()
  }

  addingNewModel() {
    this.addingComponentService.createNewParentPart(
      this.addingModelForm.get('equipment_name')?.value
    ).subscribe({
      next: (res: any) => {
        this.router.navigate(['adding-equipment/' + res])
        this.toastrService.success('Новая модель добавлена, вы были направлены в конструктор модели')
        this.dialogRef.close()
      }
    })
  }

  ngOnInit(): void {
    this.addingModelForm = new FormGroup({
      equipment_name: new FormControl('', [Validators.required])
    })

    this.addingPositionForm = new FormGroup({
      position: new FormControl('', [Validators.required])
    })
    this.getAllModels()
  }
}
