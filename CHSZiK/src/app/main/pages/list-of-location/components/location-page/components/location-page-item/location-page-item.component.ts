import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {ListOfLocationService} from "../../../../services/list-of-location.service";
import {IPosition} from "../../../../../../../models/position";
import {LocationPageComponent} from "../../layout/location-page.component";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-location-page-item',
  templateUrl: './location-page-item.component.html',
  styleUrls: ['./location-page-item.component.scss'],
})
export class LocationPageItemComponent implements OnInit{

  constructor(private router: Router, private listOfLocationService: ListOfLocationService, private locationPageComponent: LocationPageComponent, private toastrService: ToastrService) {
  }

  pdfStrModel: boolean
  searchStringModel = '.pdf'


  @Output() send: EventEmitter<number> = new EventEmitter<number>()

  @Input() position: IPosition

  btnDelete(id: number) {
    this.listOfLocationService.deletePositionModel(id).subscribe(() => {
      this.locationPageComponent.getPositionModels()
      this.toastrService.success('Позиция удалена')
    })
  }


  ngOnInit(): void {
    if(this.position.image) {
      this.pdfStrModel = this.position.image.includes(this.searchStringModel)
    }

  }
}
