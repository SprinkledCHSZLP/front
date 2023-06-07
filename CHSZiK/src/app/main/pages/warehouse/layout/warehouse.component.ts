import {Component, OnDestroy, OnInit, Output} from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";

import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {ModalCreatingItemInWarehouseComponent} from "../modal/modal-creating-item-in-warehouse.component";


@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss'],
})
export class WarehouseComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private route: ActivatedRoute, private toastrService: ToastrService, private dialog: MatDialog) {
  }

  @Output() openModal = false

  btnOpenModal() {
    this.dialog.open(ModalCreatingItemInWarehouseComponent)
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}
