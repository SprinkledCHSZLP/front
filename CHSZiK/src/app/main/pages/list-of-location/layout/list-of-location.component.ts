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
  loading: boolean

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
        console.log('getParentLocation')
      }
    })
  }

  btnBack() {
    this.isMainList = true
    this.loadedChild = true
    window.history.back()
  }

  btnOpenModal() {
    this.dialog.open(ModalComponent).componentInstance.addSend.subscribe((component) => {
      this.addingLocation(component)
    })
  }

  getAllLocation() {
    // if(this.isMainList) {
    //   this.loading = true
    // }
    // this.loadedChild = true
    this.listOfLocationService.getAllLocation(this.parent_location_id).subscribe((location) => {
      if(location) {
        this.location = location.data
        this.loading = false
        this.loadedChild = false
        console.log('getAllLocation')
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

  // ifNotIsMain() {
  //   this.sub$.add(
  //     this.route.params.subscribe(params => {
  //       this.parent_location_id = params['id']
  //       if (this.parent_location_id != 0) {
  //         this.getAllLocation()
  //         this.getParentLocation()
  //       }
  //     })
  //   )
  // }
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
        console.log('СТРАНИЦА НОМЕР = ')
        console.log(this.parent_location_id)
      }
      if (this.parent_location_id == 0) {
        // this.isMainList = true
        this.getAllLocation()
      }
    })

    if(this.isMainList == false) {
      this.ifNotIsMain()
    }
  }

  ngOnDestroy(): void {
    console.log('отписка')
    this.sub$.unsubscribe()
  }
}
