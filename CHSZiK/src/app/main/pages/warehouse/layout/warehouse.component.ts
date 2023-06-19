import {Component, OnDestroy, OnInit, Output} from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";

import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {WarehouseService} from "../services/warehouse.service";
import {ModalCreatingGroupInWarehouseComponent} from "../modal/modal-creating-group-in-warehouse.component";
import {IGroup} from "../../../../models/groups-in-warehouse";
import {ModalConfirmationComponent} from "../../modal-confirmation/modal-confirmation.component";


@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss'],
})
export class WarehouseComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private route: ActivatedRoute, private toastrService: ToastrService, private dialog: MatDialog, private warehouseService: WarehouseService) {
  }

  groups: IGroup[] = []
  @Output() openModal = false
  loading: boolean = true

  openGroup(id: number) {
    this.router.navigate(['warehouse-group', id])
  }

  btnOpenModal() {
    this.dialog.open(ModalCreatingGroupInWarehouseComponent).componentInstance.send.subscribe((component) => {
      this.warehouseService.createGroup(component).subscribe(() => {
        this.toastrService.success('Добавлено')
        this.getGroups()
      })
    })
  }

  getGroups() {
    this.warehouseService.getGroupsInWarehouse().subscribe((groups) => {
      if(groups) {
        this.groups = groups.data
        this.loading = false
      }
    })
  }

  deleteGroup(id: number) {
    this.dialog.open(ModalConfirmationComponent).componentInstance.sendConfirmation.subscribe((send) => {
      if(send) {
        this.warehouseService.deleteGroupInWarehouse(id).subscribe(() => {
          this.getGroups()
          this.toastrService.success('Удалено')
        })
      }
    })
  }

  ngOnInit(): void {
    this.getGroups()
  }

  ngOnDestroy(): void {
  }
}
