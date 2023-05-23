import {Component, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {ListOfLocationService} from "../../../services/list-of-location.service";
import {ILocation} from "../../../../../../models/location";

@Component({
  selector: 'app-location-page',
  templateUrl: './location-page.component.html',
  styleUrls: ['./location-page.component.scss'],
})
export class LocationPageComponent implements OnInit {

  constructor(private router: Router, private listOfLocationService: ListOfLocationService) {
  }

  parentLocation: ILocation

  getParentLocation() {
    this.listOfLocationService.getParantLocation().subscribe((parentLocation) => {
      this.parentLocation = parentLocation.data
    })
  }

  btnBack() {
    window.history.back()
  }
  openLocation() {
    this.router.navigate(['list-of-location', this.parentLocation.id])
  }

  // loading = true
  ngOnInit(): void {
    this.getParentLocation()

  }
}
