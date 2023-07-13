import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType, HttpRequest} from "@angular/common/http";
import * as docx from 'docx-preview'

import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {IParentServiceFile} from "../../../../../../../../../models/parent-service";
import {MaintenanceSheetEditingService} from "../../services/maintenance-sheet-editing.service";
import {MaintenanceSheetEditingComponent} from "../../layout/maintenance-sheet-editing.component";
import {ModalConfirmationComponent} from "../../../../../../../modal-confirmation/modal-confirmation.component";

@Component({
  selector: 'app-viewing-files-in-maintenance',
  templateUrl: './viewing-files-in-maintenance.component.html',
  styleUrls: ['./viewing-files-in-maintenance.component.scss']
})
export class ViewingFilesInMaintenanceComponent implements OnInit {

  constructor(private http: HttpClient, private maintenanceSheetEditingService: MaintenanceSheetEditingService, private maintenanceSheetEditingComponent: MaintenanceSheetEditingComponent, private toastrService: ToastrService, public dialog: MatDialog) {
  }
  @Input() parentFileArr: IParentServiceFile
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
        this.maintenanceSheetEditingService.deleteFile(this.parentFileArr.id).subscribe(() => {
            this.maintenanceSheetEditingComponent.getParentService()
            this.toastrService.success('Схема удалена')
          }
        )
      }
    })
  }

  ngOnInit(): void {

    if (this.parentFileArr.files_reference.includes('.pdf')) {
      this.pdfStr = true
    }

    if(this.parentFileArr.files_reference.includes('.docx')) {
      this.getContactsDictionary(this.parentFileArr.files_reference)
      this.docx = true
    }
  }
}
