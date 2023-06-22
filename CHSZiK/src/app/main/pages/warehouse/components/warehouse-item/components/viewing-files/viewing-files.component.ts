import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {IParentPartFile} from "../../../../../../../models/parent-part-equipment";
import {HttpClient, HttpEvent, HttpEventType, HttpRequest} from "@angular/common/http";
import * as docx from 'docx-preview'

import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs";
import {ModalConfirmationComponent} from "../../../../../modal-confirmation/modal-confirmation.component";
import {MatDialog} from "@angular/material/dialog";
import {WarehouseService} from "../../../../services/warehouse.service";
import {WarehouseItemComponent} from "../../layout/warehouse-item.component";

@Component({
  selector: 'app-viewing-files',
  templateUrl: './viewing-files.component.html',
  styleUrls: ['./viewing-files.component.scss']
})
export class ViewingFilesComponent implements OnInit {

  constructor(private http: HttpClient, private toastrService: ToastrService, public dialog: MatDialog, private warehouseService: WarehouseService, private warehouseItemComponent: WarehouseItemComponent) {
  }
  @Input() parentFileArr: IParentPartFile
  @ViewChild('render') render: ElementRef
  subConfirmation$: Subscription = new Subscription()

  pdfStr: boolean = false
  docx: boolean = false

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

  deleteFile() {
    this.dialog.open(ModalConfirmationComponent).componentInstance.sendConfirmation.subscribe((send) => {
      if(send) {
        this.warehouseService.deleteFileByTypeSparePart(this.parentFileArr.id).subscribe(() => {
            this.warehouseItemComponent.getTypeSparePart()
            this.toastrService.success('Схема удалена')
          }
        )
      }
    })
  }

  ngOnInit(): void {

    if (this.parentFileArr.image_plan_reference.includes('.pdf')) {
      this.pdfStr = true
    }

    if(this.parentFileArr.image_plan_reference.includes('.docx')) {
      this.getContactsDictionary(this.parentFileArr.image_plan_reference)
      this.docx = true
    }
  }
}
