import {Component, OnInit, Output} from '@angular/core';
import {ListOfLocationService} from "../services/list-of-location.service";
import {ILocation} from "../../../../models/location";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-of-location',
  templateUrl: './list-of-location.component.html',
  styleUrls: ['./list-of-location.component.scss'],
})
export class ListOfLocationComponent implements OnInit {

  constructor(private listOfLocationServoce: ListOfLocationService, private router: Router) {
  }
  @Output() addingNewLocation = false

  location: ILocation[] = []

  // loading = true
  btnOpenModal() {
  this.addingNewLocation = true
  }
  btnCloseModal(status: boolean) {
    this.addingNewLocation = false
  }

  openLocaton(id: number) {
    this.router.navigate(['location-page', id])
  }

  getAllLocation() {
    this.listOfLocationServoce.getAllLocation().subscribe((location) => {
      if(location) {
        this.location = location.data
        console.log('location = ' + this.location)
      }
    })
  }


  ngOnInit(): void {
    this.getAllLocation()
  }
}
