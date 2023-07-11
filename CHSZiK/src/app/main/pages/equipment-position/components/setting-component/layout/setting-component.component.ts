import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IPartEquipmentPosition} from "../../../../../../models/part-equipment-position";
import {EquipmentPositionComponent} from "../../../layout/equipment-position.component";

@Component({
  selector: 'app-setting-component',
  templateUrl: './setting-component.component.html',
  styleUrls: ['./setting-component.component.scss']
})
export class SettingComponentComponent implements OnInit {
  service: boolean = false
  @Input() part: IPartEquipmentPosition

  constructor(private router: Router, private route: ActivatedRoute, private equipmentPositionComponent: EquipmentPositionComponent) {
  }

  serve() {
    if(this.part.service) {
      this.service = !this.service
    }
  }

  openComponent(id: number) {
    this.router.navigate(['equipment-position/' + id])
    this.equipmentPositionComponent.loading = true
  }

  submitMainTenanceSheetEditing() {
    this.router.navigate(['maintenance-sheet-editing', this.part.id])
  }

  ngOnInit(): void {
  }

}
