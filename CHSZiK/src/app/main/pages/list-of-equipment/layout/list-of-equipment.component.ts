import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-of-equipment',
  templateUrl: './list-of-equipment.component.html',
  styleUrls: ['./list-of-equipment.component.scss'],
})
export class ListOfEquipmentComponent {

  constructor(private route: Router) {
  }

  submitAddingEquipment() {
    this.route.navigate(['adding-equipment'])
  }
}
