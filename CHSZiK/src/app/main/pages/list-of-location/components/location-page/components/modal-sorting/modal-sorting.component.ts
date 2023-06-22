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
  locationId: number
}

@Component({
  selector: 'app-modal-sorting',
  templateUrl: './modal-sorting.component.html',
  styleUrls: ['./modal-sorting.component.scss']
})

export class ModalSortingComponent implements OnInit {
  constructor(private addingComponentService: AddingComponentService, private router: Router, private listOfLocationService: ListOfLocationService, private listOfEquipmentService: ListOfEquipmentService, public dialogRef: MatDialogRef<ModalSortingComponent>, @Inject(MAT_DIALOG_DATA) public data: IPositionData, private toastrService: ToastrService) {
  }
  positionsArr: IPosition[] = []
  equipment_id: number
  isModels: boolean = true
  locationId: number
  positionOnLocationForm!: FormGroup;
  @Output() sendAdd: EventEmitter<{id: number, locations_id: string}> = new EventEmitter<{id: number, locations_id: string}>()

  getPosition() {
    this.locationId = this.data.locationId
    this.listOfLocationService.getPositionModels(this.locationId).subscribe((positionsArr) => {
      if (positionsArr) {
        this.positionsArr = positionsArr.data
        this.positionsArr.push({id: 1, position: "213", position_on_location: 1, equipment_id: 5, location_id: 1, image: "asd", equipment_name: "123", group_id: "123"})
      }
    })
  }

  back() {
    this.isModels = true
  }

  btnCloseModal() {
   this.dialogRef.close()
  }

  ngOnInit(): void {
    this.positionOnLocationForm = new FormGroup({
      position_on_location: new FormControl('')
    })
    this.getPosition()
  }
}
