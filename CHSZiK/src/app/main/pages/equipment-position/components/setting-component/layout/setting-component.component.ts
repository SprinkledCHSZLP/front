import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IPartEquipmentPosition} from "../../../../../../models/part-equipment-position";

@Component({
  selector: 'app-setting-component',
  templateUrl: './setting-component.component.html',
  styleUrls: ['./setting-component.component.scss']
})
export class SettingComponentComponent implements OnInit {
  service: boolean = false
  @Input() part: IPartEquipmentPosition

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  serveOn() {
    if(this.part.service) {
      this.service = true
    }
  }
  serveOff() {
    this.service = false
  }
  submitMainTenanceSheetEditing() {
    this.router.navigate(['maintenance-sheet-editing', this.part.id])
  }

  ngOnInit(): void {
  }

}
