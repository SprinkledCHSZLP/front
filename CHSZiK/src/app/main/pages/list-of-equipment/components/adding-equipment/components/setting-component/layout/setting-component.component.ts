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
  submitMainTenanceSheetEditing() {
    this.router.navigate(['maintenance-sheet-editing', '0'])
  }

}
