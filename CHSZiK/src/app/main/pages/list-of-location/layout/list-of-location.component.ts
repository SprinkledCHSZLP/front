import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {ListOfLocationService} from "../services/list-of-location.service";
import {ILocation} from "../../../../models/location";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-list-of-location',
  templateUrl: './list-of-location.component.html',
  styleUrls: ['./list-of-location.component.scss'],
})
export class ListOfLocationComponent implements OnInit, OnDestroy {

  constructor(private listOfLocationService: ListOfLocationService, private router: Router, private route: ActivatedRoute) {
  }
  @Output() addingNewLocation = false
  sub$: Subscription = new Subscription()
  parent_location_id: number
  parentLocation: ILocation
  location: ILocation[] = []

  isMainList: boolean = true

  getParentLocation() {
    this.listOfLocationService.getParentLocation(this.parent_location_id).subscribe((parentLocation) => {
      if(parentLocation) {
        this.parentLocation = parentLocation.data
      }
    })
  }

  btnBack() {
    window.history.back()
  }

  // loading = true
  btnOpenModal() {
  this.addingNewLocation = true
  }
  btnCloseModal(status: boolean) {
    this.addingNewLocation = false
  }

  getAllLocation() {
    this.listOfLocationService.getAllLocation(this.parent_location_id).subscribe((location) => {
      if(location) {
        this.location = location.data
        console.log('location = ' + this.location)
      }
    })
  }
  addingLocation(component: ILocation) {
    this.listOfLocationService.addingLocation({
      ...component, parent_location_id: this.parent_location_id
    }).subscribe(() => {
      this.getAllLocation()
    })
  }

  ifNotIsMain() {
    this.sub$.add(
      this.route.params.subscribe(params => {
        this.parent_location_id = params['id']
        if (this.parent_location_id != 0) {
          this.getAllLocation()
          this.getParentLocation()
        }
      })
    )
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.parent_location_id = params['id']
      if(this.parent_location_id != 0) {
        this.isMainList = false
      }
    })

    if(this.isMainList == false) {
      this.ifNotIsMain()
    }

    this.getAllLocation()
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe()
  }
}
