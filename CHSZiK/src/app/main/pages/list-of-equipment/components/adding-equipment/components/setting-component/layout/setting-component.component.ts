import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {IPart} from "../../../../../../../../models/part-equipment";

@Component({
  selector: 'app-setting-component',
  templateUrl: './setting-component.component.html',
  styleUrls: ['./setting-component.component.scss']
})
export class SettingComponentComponent{

  @Input() part: IPart

  constructor(private router: Router) {
  }

  openSettings() {
    this.router.navigate(['adding-equipment', this.part.id])
    console.log('айди = ' + this.part.id)
  }

  submitMainTenanceSheetEditing() {
    this.router.navigate(['maintenance-sheet-editing', '0'])
  }

}
