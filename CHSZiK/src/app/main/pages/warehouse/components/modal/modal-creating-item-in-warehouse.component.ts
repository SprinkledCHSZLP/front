import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {MatDialogRef} from "@angular/material/dialog";
import {map, Observable, startWith, Subscription} from "rxjs";
import {WarehouseService} from "../../services/warehouse.service";

export interface IGroup {
  group: string;
}

@Component({
  selector: 'app-modal-creating-item-in-warehouse',
  templateUrl: './modal-creating-item-in-warehouse.component.html',
  styleUrls: ['./modal-creating-item-in-warehouse.component.scss']
})
export class ModalCreatingItemInWarehouseComponent implements OnInit {
  constructor(private toastrService: ToastrService, public dialogRef: MatDialogRef<ModalCreatingItemInWarehouseComponent>, private warehouseService: WarehouseService) {
  }
  addingNewItem!: FormGroup;
  @Output() send: EventEmitter<{name: string, manufacturer: string, article: string, type_measure_units_id?: number}> = new EventEmitter<{name: string, manufacturer: string, article: string, type_measure_units_id?: number}>()
  unitMap = new Map<string, number>([
    ['Вес', 1],
    ['Объём', 2],
    ['Длина', 3]
  ])
  group: IGroup[] = []
  disableSelect = new FormControl(true);

  btnCloseModal() {
    this.dialogRef.close()
  }

  displayFn(group: IGroup): string {
    return group && group.group ? group.group : '';
  }

  myControl = new FormControl<string | IGroup>('');
  options: IGroup[] = this.group
  filteredOptions: Observable<IGroup[]>;

  private _filter(group: string): IGroup[] {
    const filterValue = group.toLowerCase();
    return this.options.filter(option => option.group.toLowerCase().includes(filterValue));
  }

  getGroupSparePart() {
    this.warehouseService.getGroupSparePart().subscribe((group) => {
      if(group) {
        this.group = group.data
        this.options = this.group

        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => {
            const name = typeof value === 'string' ? value : value?.group;
            return name ? this._filter(name as string) : this.options.slice();
          }),
        );
      }
    })
  }

  saveNewItem() {
    let component: {name: string, manufacturer: string, article: string, type_measure_units_id?: number, group: string | IGroup | null} = {
      name: this.addingNewItem.get('name')?.value,
      manufacturer: this.addingNewItem.get('manufacturer')?.value,
      article: this.addingNewItem.get('article')?.value,
      type_measure_units_id: this.unitMap.get(this.addingNewItem.get('type_measure_units_id')?.value),
      group: this.myControl.value
    }
    console.log(component)
    if(this.disableSelect.value == false) {
      component.type_measure_units_id = undefined
    }
    this.send.emit(component)
    this.dialogRef.close()
  }


  ngOnInit(): void {

    this.getGroupSparePart()
    this.addingNewItem = new FormGroup({
      name: new FormControl('', [Validators.required]),
      manufacturer: new FormControl(''),
      article: new FormControl(''),
      type_measure_units_id: new FormControl('')
    })
  }
}
