import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {IModel} from "../../../../../models/models-equipment";
import {Router} from "@angular/router";
import {ListOfEquipmentService} from "../../services/list-of-equipment.service";
import {MatDialog} from "@angular/material/dialog";
import {ModalPositionComponent} from "../modal-position/modal-position.component";
import {ToastrService} from "ngx-toastr";
import {HttpClient, HttpEvent, HttpEventType, HttpRequest} from "@angular/common/http";
import * as docx from 'docx-preview'
import {ModalConfirmationComponent} from "../../../modal-confirmation/modal-confirmation.component";

@Component({
  selector: 'app-list-of-equipment-models',
  templateUrl: './list-of-equipment-models.component.html',
  styleUrls: ['./list-of-equipment-models.component.scss'],
})
export class ListOfEquipmentModelsComponent implements OnInit{

  constructor(private router: Router, private listOfEquipmentService: ListOfEquipmentService, private dialog: MatDialog, private http: HttpClient) {
  }
  @ViewChild('render') render: ElementRef
  docx: boolean = false
  pdfStrModel: boolean = false
  @Output() send: EventEmitter<number> = new EventEmitter<number>()
  @Input() models: IModel

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

  openSettings() {
    this.router.navigate(['adding-equipment', this.models.id])
  }

  openPositionModal() {
    this.dialog.open(ModalPositionComponent, {data: {modelsId:this.models.id} })
  }

  deleteModel() {

    this.dialog.open(ModalConfirmationComponent).componentInstance.sendConfirmation.subscribe((send) => {
      if(send) {
        this.send.emit(this.models.id)
      }
    })
    // this.send.emit(this.models.id)
  }

  ngOnInit(): void {

    if(this.models.image_plan_reference) {
      if (this.models.image_plan_reference.includes('.pdf')) {
        this.pdfStrModel = true
      }

      if(this.models.image_plan_reference.includes('.docx')) {
        this.getContactsDictionary(this.models.image_plan_reference)
        this.docx = true
      }
    }


    // if(this.models.image_plan_reference) {
    //   this.pdfStrModel = this.models.image_plan_reference.includes('.pdf')
    // }

  }
}

