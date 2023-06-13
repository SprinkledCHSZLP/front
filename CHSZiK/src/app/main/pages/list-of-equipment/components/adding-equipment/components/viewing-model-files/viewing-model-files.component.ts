import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {IParentPartFile} from "../../../../../../../models/parent-part-equipment";
import {HttpClient, HttpEvent, HttpEventType, HttpRequest} from "@angular/common/http";
import * as docx from 'docx-preview'
import {AddingComponentService} from "../../services/adding-component.service";
import {AddingEquipmentComponent} from "../../layout/adding-equipment.component";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-viewing-model-files',
  templateUrl: './viewing-model-files.component.html',
  styleUrls: ['./viewing-model-files.component.scss']
})
export class ViewingModelFilesComponent implements OnInit {

  constructor(private http: HttpClient, private addingComponentService: AddingComponentService, private addingEquipmentComponent: AddingEquipmentComponent, private toastrService: ToastrService) {
  }
  @Input() parentFileArr: IParentPartFile
  @ViewChild('render') render: ElementRef

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
    this.addingComponentService.deleteFile(this.parentFileArr.id).subscribe(() => {
      this.addingEquipmentComponent.getParentPart()
      this.toastrService.success('Схема удалена')
      }
    )
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
