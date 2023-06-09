import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ListOfLocationService} from "../../../list-of-location/services/list-of-location.service";
import {ListOfEquipmentService} from "../../services/list-of-equipment.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {IPosition} from "../../../../../models/position";
import {ToastrService} from "ngx-toastr";
import {ModalConfirmationComponent} from "../../../modal-confirmation/modal-confirmation.component";
import {Router} from "@angular/router";

interface IModelsData {
  modelsId: number
}

@Component({
  selector: 'app-modal-position',
  templateUrl: './modal-position.component.html',
  styleUrls: ['./modal-position.component.scss']
})
export class ModalPositionComponent implements OnInit {
  constructor(private listOfLocationService: ListOfLocationService, private dialog: MatDialog, private listOfEquipmentService: ListOfEquipmentService, public dialogRef: MatDialogRef<ModalPositionComponent>, @Inject(MAT_DIALOG_DATA) public data: IModelsData, private toastrService: ToastrService, private router: Router) {
  }
  positionsArr: IPosition[] = []
  addingPositionForm!: FormGroup;

  btnCloseModal() {
    this.dialogRef.close()
  }

  deletePosition(group_id: string) {
    this.dialog.open(ModalConfirmationComponent).componentInstance.sendConfirmation.subscribe((send) => {
      if(send) {
        this.listOfEquipmentService.deletePosition(group_id).subscribe(() => {
          this.toastrService.success('Позиция удалена')
          this.openPositions(this.data.modelsId)
        })
      }
    })

    // this.listOfEquipmentService.deletePosition(group_id).subscribe(() => {
    //   this.toastrService.success('Позиция удалена')
    //   this.openPositions(this.data.modelsId)
    // })
  }

  openEquipmentPosition(id: number) {
    this.router.navigate(['equipment-position/' + id])
    this.dialogRef.close()
  }

  addingNewPosition() {
    let component: {equipment_id: number, position: string} = {
      equipment_id: this.data.modelsId,
      position: this.addingPositionForm.get('position')?.value
    }
    this.listOfLocationService.addingNewPosition(component).subscribe(() => {
      this.toastrService.success('Позиция добавлена')
      this.openPositions(this.data.modelsId)
      this.addingPositionForm.reset()
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
