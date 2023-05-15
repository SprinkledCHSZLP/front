import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IPart} from "../../../../../../../../models/part-equipment";
import {FormControl, FormGroup} from "@angular/forms";

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

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  btnDeleteComponent() {
    
  }

  openUpgradeComponent() {
    this.isUpgrade = true
  }

  upgradeComponent() {
    let upgradeComponent: IPart = {
      id: this.part.id,
      position_on_plan: this.upgradeComponentForm.get('position_on_plan')?.value,
      equipment_name: this.upgradeComponentForm.get('equipment_name')?.value,
      have_equipment: this.upgradeComponentForm.get('have_equipment')?.value,
      service: this.upgradeComponentForm.get('service')?.value,
    }
    this.send.emit(upgradeComponent)
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
      service: new FormControl(true || false),
    })
  }

}
