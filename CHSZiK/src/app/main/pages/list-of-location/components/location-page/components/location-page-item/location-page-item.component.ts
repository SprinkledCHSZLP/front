import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ListOfLocationService} from "../../../../services/list-of-location.service";
import {IPosition} from "../../../../../../../models/position";
import {LocationPageComponent} from "../../layout/location-page.component";
import {ToastrService} from "ngx-toastr";
import {HttpClient, HttpEvent, HttpEventType, HttpRequest} from "@angular/common/http";
import * as docx from 'docx-preview'
import {ModalConfirmationComponent} from "../../../../../modal-confirmation/modal-confirmation.component";
import {MatDialog} from "@angular/material/dialog";



@Component({
  selector: 'app-location-page-item',
  templateUrl: './location-page-item.component.html',
  styleUrls: ['./location-page-item.component.scss'],
})
export class LocationPageItemComponent implements OnInit{

  constructor(private router: Router, private dialog: MatDialog, private http: HttpClient, private listOfLocationService: ListOfLocationService, private locationPageComponent: LocationPageComponent, private toastrService: ToastrService) {
  }

  pdfStrModel: boolean = false
  docx: boolean = false


  @Output() send: EventEmitter<number> = new EventEmitter<number>()
  @ViewChild('render') render: ElementRef

  @Input() position: IPosition

  openSettings(id: number) {
    this.router.navigate(['adding-equipment', id])
  }

  getContactsDictionary(url: string) {
    const req = new HttpRequest(
      'GET',
      url,
      {
        reportProgress: true,
        responseType: 'blob',
      }
    )

    this.http
      .request(req)
      .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Sent')
            break
          case HttpEventType.DownloadProgress:
            console.log(
              `Downloading: ${event.loaded / 1024}Kb`
            )
            break
          case HttpEventType.Response:
            docx.renderAsync(event.body, this.render.nativeElement, undefined, {inWrapper: false} )
        }
      })
  }

  btnDelete(id: number) {

    this.dialog.open(ModalConfirmationComponent).componentInstance.sendConfirmation.subscribe((send) => {
      if(send) {
        this.listOfLocationService.deletePositionModel(id).subscribe(() => {
          this.locationPageComponent.getPositionModels()
          this.toastrService.success('Позиция удалена')
        })
      }
    })

    // this.listOfLocationService.deletePositionModel(id).subscribe(() => {
    //   this.locationPageComponent.getPositionModels()
    //   this.toastrService.success('Позиция удалена')
    // })
  }


  ngOnInit(): void {
    if(this.position.image) {
      if (this.position.image.includes('.pdf')) {
        this.pdfStrModel = true
      }

      if(this.position.image.includes('.docx')) {
        this.getContactsDictionary(this.position.image)
        this.docx = true
      }
    }

  }
}
