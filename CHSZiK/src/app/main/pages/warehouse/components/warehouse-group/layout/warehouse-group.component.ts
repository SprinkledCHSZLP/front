import {Component, OnDestroy, OnInit, Output} from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";

import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {WarehouseService} from "../../../services/warehouse.service";
import {ITypeSpareParts} from "../../../../../../models/type-spare-part";
import {ModalConfirmationComponent} from "../../../../modal-confirmation/modal-confirmation.component";
import {ModalCreatingItemInWarehouseComponent} from "../modal/modal-creating-item-in-warehouse.component";
import {IGroup} from "../../../../../../models/groups-in-warehouse";
import {FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-warehouse-group',
  templateUrl: './warehouse-group.component.html',
  styleUrls: ['./warehouse-group.component.scss'],
})
export class WarehouseGroupComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private route: ActivatedRoute, private toastrService: ToastrService, private dialog: MatDialog, private warehouseService: WarehouseService) {
  }
  upgradeName: boolean = false
  changeFormGroup!: FormGroup
  group: IGroup
  warehouseGroupId: number
  @Output() openModal = false
  loadingChildren: boolean = true
  loadingParent: boolean = true
  typeSpareParts: ITypeSpareParts[] = []

  openItem(id: number) {
    this.router.navigate(['warehouse-item', id])
  }

  getGroup() {
    this.warehouseService.getGroupInWarehouse(this.warehouseGroupId).subscribe((group) => {
      if(group) {
        this.group = group.data
        this.changeFormGroup.patchValue(this.group)
        this.loadingParent = false
      }
    })
  }

  btnOpenModal() {
    this.dialog.open(ModalCreatingItemInWarehouseComponent, {
      data: {
        group: this.group.name
      }
    }).componentInstance.send.subscribe((component) => {
      this.warehouseService.createTypeSparePart({...component, group_id: this.warehouseGroupId}).subscribe(() => {
        this.toastrService.success('Добавлено')
        this.getTypeSpareParts()
      })
    })
  }
  btnBack() {
    window.history.back()
  }

  openUpgradeGroupInWarehouse() {
    this.upgradeName = true
  }

  upgradeGroupInWarehouse() {
    this.upgradeName = false
    this.warehouseService.changeGroupInWarehouse({
      id: this.warehouseGroupId,
      name: this.changeFormGroup.get('name')?.value
    }).subscribe(() => {
      this.getGroup()
      this.toastrService.success('Наименование изменено')
    })
  }

  getTypeSpareParts() {
    this.warehouseService.getTypeSpareParts(this.warehouseGroupId).subscribe((typeSpareParts) => {
      if(typeSpareParts) {
        this.typeSpareParts = typeSpareParts.data
        this.loadingChildren = false
      }
    })
  }

  deleteTypeSpareParts(id: number) {

    this.dialog.open(ModalConfirmationComponent).componentInstance.sendConfirmation.subscribe((send) => {
      if(send) {
        this.warehouseService.deleteTypeSpareParts(id).subscribe(() => {
          this.getTypeSpareParts()
          this.toastrService.success('Удалено')
        })
      }
    })

    // this.warehouseService.deleteTypeSpareParts(id).subscribe(() => {
    //   this.getTypeSpareParts()
    //   this.toastrService.success('Удалено')
    // })
  }

  ngOnInit(): void {

    this.changeFormGroup = new FormGroup({
      name: new FormControl('')
    })


    this.route.params.subscribe(params => {
      this.warehouseGroupId = params['id']
    })
    this.getTypeSpareParts()
    this.getGroup()
  }

  ngOnDestroy(): void {
  }
}
