import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";

@Component({
  selector: 'app-adding-equipment',
  templateUrl: './adding-equipment.component.html',
  styleUrls: ['./adding-equipment.component.scss']
})
export class AddingEquipmentComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  isNew: boolean = true

  submitMainTenanceSheetEditing() {
    this.router.navigate(['maintenance-sheet-editing'])
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] !== '0') this.isNew = false
    })

  }
}
