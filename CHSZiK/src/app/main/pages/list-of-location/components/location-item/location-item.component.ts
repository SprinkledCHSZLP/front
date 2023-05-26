import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ListOfLocationComponent} from "../../layout/list-of-location.component";
import {ILocation} from "../../../../../models/location";
import {ListOfLocationService} from "../../services/list-of-location.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-location-item',
  templateUrl: './location-item.component.html',
  styleUrls: ['./location-item.component.scss']
})
export class LocationItemComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private listOfLocationComponent: ListOfLocationComponent, private listOfLocationService: ListOfLocationService) { }

  changeLocationForm!: FormGroup
  isChange: boolean = false
  @Input() location: ILocation

  openChange() {
    this.isChange = true
  }

  saveChange() {
    let component: ILocation = {
      id: this.location.id,
      name_location: this.changeLocationForm.get('name_location')?.value
    }

    this.listOfLocationService.changeLocation(component).subscribe(() => {
      this.isChange = false
    })
  }

  deleteLocation(id: number) {
    this.listOfLocationService.deleteLocation(id).subscribe(() => {
      this.listOfLocationComponent.getAllLocation()
    })
  }

  openLocaton(id: number, have_child_location: boolean) {
    if (have_child_location == true) {
      this.router.navigate(['list-of-location', id])
      this.listOfLocationComponent.ifNotIsMain()
    }
    if(have_child_location == false) {
      this.router.navigate(['location-page', id])
    }
  }

  ngOnInit() {
    this.changeLocationForm = new FormGroup({
      name_location: new FormControl('')
    })
  }

}
