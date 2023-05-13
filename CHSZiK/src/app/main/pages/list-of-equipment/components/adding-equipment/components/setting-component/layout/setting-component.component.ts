import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IPart} from "../../../../../../../../models/part-equipment";

@Component({
  selector: 'app-setting-component',
  templateUrl: './setting-component.component.html',
  styleUrls: ['./setting-component.component.scss']
})
export class SettingComponentComponent{

  @Input() part: IPart

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  openSettings() {
    this.router.navigate(['adding-equipment', this.part.id])
    console.log('айди = ' + this.part.id)
  }

  submitMainTenanceSheetEditing() {
    this.router.navigate(['maintenance-sheet-editing', '0'])
  }

}
