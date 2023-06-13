import {Component, OnDestroy, OnInit, Output} from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";

import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {ModalCreatingItemInWarehouseComponent} from "../components/modal/modal-creating-item-in-warehouse.component";
import {WarehouseService} from "../services/warehouse.service";
import {ITypeSpareParts} from "../../../../models/type-spare-part";


@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss'],
})
export class WarehouseComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private route: ActivatedRoute, private toastrService: ToastrService, private dialog: MatDialog, private warehouseService: WarehouseService) {
  }

  @Output() openModal = false
  loading: boolean = true
  typeSpareParts: ITypeSpareParts[] = []

  openItem(id: number) {
    this.router.navigate(['warehouse-item', id])
  }


  btnOpenModal() {
    this.dialog.open(ModalCreatingItemInWarehouseComponent).componentInstance.send.subscribe((component) => {
      this.warehouseService.createTypeSparePart(component).subscribe(() => {
        this.toastrService.success('Добавлено')
        this.getTypeSpareParts()
      })
    })
  }

  getTypeSpareParts() {
    this.warehouseService.getTypeSpareParts().subscribe((typeSpareParts) => {
      if(typeSpareParts) {
        this.typeSpareParts = typeSpareParts.data
        this.loading = false
      }
    })
  }

  deleteTypeSpareParts(id: number) {
    this.warehouseService.deleteTypeSpareParts(id).subscribe(() => {
      this.getTypeSpareParts()
      this.toastrService.success('Удалено')
    })
  }

  ngOnInit(): void {
    this.getTypeSpareParts()
  }

  ngOnDestroy(): void {
  }
}
