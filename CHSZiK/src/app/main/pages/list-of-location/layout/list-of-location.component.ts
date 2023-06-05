import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {ListOfLocationService} from "../services/list-of-location.service";
import {ILocation} from "../../../../models/location";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../components/modal/modal.component";

@Component({
  selector: 'app-list-of-location',
  templateUrl: './list-of-location.component.html',
  styleUrls: ['./list-of-location.component.scss'],
})
export class ListOfLocationComponent implements OnInit, OnDestroy {

  constructor(private listOfLocationService: ListOfLocationService, private router: Router, private route: ActivatedRoute, private dialog: MatDialog, private toastrService: ToastrService) {
  }

  loadedChild = true
  loadedParent: boolean
  @Output() addingNewLocation = false
  sub$: Subscription = new Subscription()
  parent_location_id: number
  parentLocation: ILocation
  location: ILocation[] = []
  isMainList: boolean = true

  getParentLocation() {
    this.loadedParent = true
    this.listOfLocationService.getParentLocation(this.parent_location_id).subscribe((parentLocation) => {
      if(parentLocation) {
        this.parentLocation = parentLocation.data
        this.loadedParent = false
      }
    })
  }

  btnBack() {
    this.isMainList = true
    this.loadedChild = true
    if(this.parentLocation.parent_location_id != null) {
      this.router.navigate(['list-of-location/', this.parentLocation.parent_location_id])
    }
    if(this.parentLocation.parent_location_id == null) {
      this.router.navigate(['list-of-location/', 0])
    }
  }

  btnOpenModal() {
    this.dialog.open(ModalComponent).componentInstance.addSend.subscribe((component) => {
      this.addingLocation(component)
    })
  }

  getAllLocation() {
    this.listOfLocationService.getAllLocation(this.parent_location_id).subscribe((location) => {
      if(location) {
        this.location = location.data
        this.loadedChild = false
      }
    })
  }
  addingLocation(component: ILocation) {
    this.listOfLocationService.addingLocation({
      ...component, parent_location_id: this.parent_location_id
    }).subscribe(() => {
      this.getAllLocation()
      this.toastrService.success('Локация добавлена')
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
      if (this.parent_location_id == 0) {
        this.getAllLocation()
      }
    })

    if(!this.isMainList) {
      this.ifNotIsMain()
    }
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe()
  }
}
