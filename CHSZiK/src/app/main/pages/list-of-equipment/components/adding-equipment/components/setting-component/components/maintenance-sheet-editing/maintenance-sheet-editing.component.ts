import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-maintenance-sheet-editing',
  templateUrl: './maintenance-sheet-editing.component.html',
  styleUrls: ['./maintenance-sheet-editing.component.scss']
})
export class MaintenanceSheetEditingComponent{
  constructor(private router: Router) {
  }
  btnBack() {
    this.router.navigate(['adding-equipment', '0'])
  }
}
