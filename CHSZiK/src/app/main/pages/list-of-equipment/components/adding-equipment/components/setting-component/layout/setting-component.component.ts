import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IPart} from "../../../../../../../../models/part-equipment";
import {FormControl, FormGroup} from "@angular/forms";
import {AddingComponentService} from "../../../services/adding-component.service";
import {AddingEquipmentComponent} from "../../../layout/adding-equipment.component";

@Component({
  selector: 'app-setting-component',
  templateUrl: './setting-component.component.html',
  styleUrls: ['./setting-component.component.scss']
})
export class SettingComponentComponent implements OnInit{

  upgradeComponentForm!: FormGroup
  @Output() send: EventEmitter<IPart> = new EventEmitter<IPart>()
  isUpgrade: boolean = false
  @Input() part: IPart

  constructor(private router: Router, private route: ActivatedRoute, private addingComponentService: AddingComponentService, private addingEquipmentComponent: AddingEquipmentComponent) {
  }

  btnDeletePart() {
    this.addingComponentService.deletePart(this.part.id).subscribe( {
      next: (res: any) => {
        console.log('Удаление прошло успешно')
        this.addingEquipmentComponent.getAllPart()
      },
      error: (err) => {
        console.log('Не удалено' + err)
      }
    })
    console.log('АЙДИ удаления' + this.part.id)
  }

  openUpgradePart() {
    this.isUpgrade = true
  }

  upgradePart() {
    let component: IPart = {
      id: this.part.id,
      position_on_plan: this.upgradeComponentForm.get('position_on_plan')?.value,
      equipment_name: this.upgradeComponentForm.get('equipment_name')?.value,
      have_equipment: this.upgradeComponentForm.get('have_equipment')?.value,
      service: this.upgradeComponentForm.get('service')?.value,
    }
    this.send.emit(component)
    console.log('Компонент ' + component.service)
    this.isUpgrade = false
  }

  openSettings() {
    this.router.navigate(['adding-equipment', this.part.id])
  }

  submitMainTenanceSheetEditing() {
    this.router.navigate(['maintenance-sheet-editing', this.part.id])
  }

  ngOnInit(): void {
    this.upgradeComponentForm = new FormGroup({
      position_on_plan: new FormControl(''),
      equipment_name: new FormControl(''),
      have_equipment: new FormControl(true || false),
      service: new FormControl(true || false)
    })
  }

}
