import {Component, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {ModalReplenishmentComponent} from "../components/modal-replenishment/modal-replenishment.component";
import {ITypeSpareParts} from "../../../../../../models/type-spare-part";
import {WarehouseService} from "../../../services/warehouse.service";
import {ISparePart} from "../../../../../../models/spare-part";
import {FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-warehouse-item',
  templateUrl: './warehouse-item.component.html',
  styleUrls: ['./warehouse-item.component.scss'],
})
export class WarehouseItemComponent implements OnInit{

  constructor(private router: Router, private route: ActivatedRoute, private toastrService: ToastrService, private dialog: MatDialog, private warehouseService: WarehouseService) {
  }

  warehouseForm!: FormGroup;
  consumables: boolean
  sparePart: ISparePart[] = []
  loading: boolean = true
  typeSparePart: ITypeSpareParts
  parentSparePartId: number
  isUpgradePrice: boolean = false
  isUpgradeManufacturer: boolean = false
  isUpgradeArticle: boolean = false
  isUpgradeName: boolean = false

  getTypeSparePart() {
    this.warehouseService.getTypeSparePart(this.parentSparePartId).subscribe((typeSparePart) => {
      if(typeSparePart) {
        this.typeSparePart = typeSparePart.data
        this.warehouseForm.patchValue(this.typeSparePart)
        if(this.typeSparePart.type_measure_units_id == null) {
          this.consumables = false
        }
        if(this.typeSparePart.type_measure_units_id != null) {
          this.consumables = true
        }
        this.loading = false
      }
    })
  }


  openUpgradeName() {
    this.isUpgradeName = true
  }

  upgradeName() {
    this.isUpgradeName = false
    this.warehouseService.changeTypeSparePart({
      id: this.parentSparePartId,
      name: this.warehouseForm.get('name')?.value
    }).subscribe(() => {
      this.getTypeSparePart()
      this.toastrService.success('Наименование обновлено')
    })
  }

  openUpgradePrice() {
    this.isUpgradePrice = true
  }

  upgradePrice() {
    this.isUpgradePrice = false
    this.warehouseService.changeTypeSparePart({
      id: this.parentSparePartId,
      price: this.warehouseForm.get('price')?.value
    }).subscribe(() => {
      this.getTypeSparePart()
      this.toastrService.success('Цена обновлена')
    })
  }

  OpenUpgradeManufacturer() {
    this.isUpgradeManufacturer = true
  }

  upgradeManufacturer() {
    this.isUpgradeManufacturer = false
    this.warehouseService.changeTypeSparePart({
      id: this.parentSparePartId,
      manufacturer: this.warehouseForm.get('manufacturer')?.value
    }).subscribe(() => {
      this.getTypeSparePart()
      this.toastrService.success('Производитель обновлён')
    })
  }

  OpenUpgradeArticle() {
    this.isUpgradeArticle = true
  }

  upgradeArticle() {
    this.isUpgradeArticle = false
    this.warehouseService.changeTypeSparePart({
      id: this.parentSparePartId,
      article: this.warehouseForm.get('article')?.value
    }).subscribe(() => {
      this.getTypeSparePart()
      this.toastrService.success('Артикул обновлён')
    })
  }

  openModalReplenishment() {
    if(this.typeSparePart.type_measure_units_id != null) {
      this.dialog.open(ModalReplenishmentComponent, {data: this.typeSparePart.type_measure_units_id}).componentInstance.send.subscribe((component) => {
        this.warehouseService.createSparePart({
          ...component, type_parts_id: this.parentSparePartId
        }).subscribe(() => {
          this.getTypeSparePart()
          this.getSparePart()
          this.toastrService.success('Пополнено')
        })
      })
    }
    if(this.typeSparePart.type_measure_units_id == null) {
      this.warehouseService.createSparePart({type_parts_id: this.parentSparePartId}).subscribe(() => {
        this.getSparePart()
        this.toastrService.success('Пополнено')
      })
    }

  }

  getSparePart() {
    this.warehouseService.getSparePart(this.parentSparePartId).subscribe((sparePart) => {
      if(sparePart) {
        this.sparePart = sparePart.data
      }
    })
  }

  btnBack() {
    window.history.back()
  }

  ngOnInit(): void {
    this.warehouseForm = new FormGroup({
      name: new FormControl(''),
      article: new FormControl(''),
      price: new FormControl(''),
      manufacturer: new FormControl('')
    })

    this.route.params.subscribe(params => {
      this.parentSparePartId = params['id']
    })
    this.getSparePart()
    this.getTypeSparePart()
  }
}
