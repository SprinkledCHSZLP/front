import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {IPart} from "../../../../../../models/part-equipment";
import {ListOfEquipmentService} from "../../../services/list-of-equipment.service";

@Component({
  selector: 'app-adding-equipment',
  templateUrl: './adding-equipment.component.html',
  styleUrls: ['./adding-equipment.component.scss']
})
export class AddingEquipmentComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private listOfEquipmentService: ListOfEquipmentService) {
  }
  part: IPart[] = []


  btnBack() {
    this.router.navigate([''])
  }

  isNew: boolean = true

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] !== '0') this.isNew = false
    })

    this.listOfEquipmentService.getAllPart().subscribe((part) => {
      console.log(part)
      if(part) {
        this.part = part.data
      }
    })
  }
}
