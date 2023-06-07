import {Component, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-warehouse-item',
  templateUrl: './warehouse-item.component.html',
  styleUrls: ['./warehouse-item.component.scss'],
})
export class WarehouseItemComponent implements OnInit{

  constructor(private router: Router, private route: ActivatedRoute, private toastrService: ToastrService) {
  }

  isUpgradePrice: boolean = false
  isUpgradeManufacturer: boolean = false
  isUpgradeArticle: boolean = false

  OpenUpgradePrice() {
    this.isUpgradePrice = true
  }

  upgradePrice() {
    this.isUpgradePrice = false
  }

  OpenUpgradeManufacturer() {
    this.isUpgradeManufacturer = true
  }

  upgradeManufacturer() {
    this.isUpgradeManufacturer = false
  }

  OpenUpgradeArticle() {
    this.isUpgradeArticle = true
  }

  upgradeArticle() {
    this.isUpgradeArticle = false
  }



  btnBack() {

  }

  ngOnInit(): void {
  }
}
