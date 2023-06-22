import {Component, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ListOfLocationService} from "../../../services/list-of-location.service";
import {ILocation} from "../../../../../../models/location";
import {MatDialog} from "@angular/material/dialog";
import {
  ModalWindowAddingModelComponent
} from "../components/modal-window-adding-model/modal-window-adding-model.component";
import {IPosition} from "../../../../../../models/position";
import {Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {ModalSortingComponent} from "../components/modal-sorting/modal-sorting.component";

@Component({
  selector: 'app-location-page',
  templateUrl: './location-page.component.html',
  styleUrls: ['./location-page.component.scss'],
})
export class LocationPageComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private listOfLocationService: ListOfLocationService, private route: ActivatedRoute, private dialog: MatDialog, private toastrService: ToastrService) {
  }

  loadedParent = true
  loadedChild = true
  sub$: Subscription = new Subscription()
  parent_location_id: number
  parentLocation: ILocation
  positionModel: IPosition[] = []
  @Output() openModalWindow: boolean = false
  @Input() parentLoc: ILocation

  btnBack() {
    window.history.back()
  }

  openModalSorting() {
    this.dialog.open(ModalSortingComponent, {data: {locationId: this.parent_location_id}})
  }

  deletePositionModel(id: number) {
    this.listOfLocationService.deletePositionModel(id).subscribe(() => {
      this.getPositionModels()
    })
  }

  getPositionModels() {
    this.listOfLocationService.getPositionModels(this.parent_location_id).subscribe((positionModels) => {
      if (positionModels) {
        this.positionModel = positionModels.data
        this.loadedChild = false
      }
    })
  }

  openModalWindowAddingModel() {
    this.dialog.open(ModalWindowAddingModelComponent, {data: {locationId: this.parent_location_id}}).componentInstance.sendAdd.subscribe((component) => {
    });
  }

  openLocation() {
    this.listOfLocationService.splitLocation({
        id: this.parent_location_id
      }
    ).subscribe(() => {
      this.router.navigate(['list-of-location', this.parentLocation.id])
    })
  }

  getParentLocation() {
    this.listOfLocationService.getParentLocation(this.parent_location_id).subscribe((parentLocation) => {
      if (parentLocation) {
        this.parentLocation = parentLocation.data
        this.loadedParent = false
      }
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.parent_location_id = params['id']
    })

    this.sub$.add(this.listOfLocationService.update$.subscribe(() => {
      this.getPositionModels()
    }))

    this.getParentLocation()

    this.getPositionModels()
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe()
  }
}
