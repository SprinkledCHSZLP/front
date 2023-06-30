import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {map, Observable, startWith} from "rxjs";
import {WarehouseService} from "../../../services/warehouse.service";
import {IManufacturer} from "../../../../../../models/type-spare-part";

@Component({
  selector: 'app-modal-creating-item-in-warehouse',
  templateUrl: './modal-creating-item-in-warehouse.component.html',
  styleUrls: ['./modal-creating-item-in-warehouse.component.scss']
})

export class ModalCreatingItemInWarehouseComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ModalCreatingItemInWarehouseComponent>, @Inject(MAT_DIALOG_DATA) public data: {group: string}, private warehouseService: WarehouseService) {
  }
  addingNewItem!: FormGroup;
  @Output() send: EventEmitter<{name: string, manufacturer: string | null, article: string, type_measure_units_id?: number}> = new EventEmitter<{name: string, manufacturer: string | null, article: string, type_measure_units_id?: number}>()
  // unitMap = new Map<string, number>([
  //   ['Вес', 1],
  //   ['Объём', 2],
  //   ['Длина', 3]
  // ])

  btnCloseModal() {
    this.dialogRef.close()
  }
  manufacturer: string[] = []

  myControl = new FormControl('');

  options: string[] = this.manufacturer
  filteredOptions: Observable<string[]>;

  private _filter(manufacturer: string): string[] {
    const filterValue = manufacturer.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  getGroupSparePart() {
    this.warehouseService.getManufacturer().subscribe((manufacturer) => {
      if(manufacturer) {
        this.manufacturer = manufacturer.data
        this.options = this.manufacturer

        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        );
      }
    })
  }

  saveNewItem() {
    let component: {name: string, manufacturer: string | null, article: string} = {
      name: this.addingNewItem.get('name')?.value,
      manufacturer: this.myControl.value,
      article: this.addingNewItem.get('article')?.value
    }
    this.send.emit(component)
    this.dialogRef.close()
  }


  ngOnInit(): void {
    this.getGroupSparePart()
    this.addingNewItem = new FormGroup({
      name: new FormControl(this.data.group, [Validators.required]),
      manufacturer: new FormControl(''),
      article: new FormControl(''),
      type_measure_units_id: new FormControl('')
    })
  }
}
