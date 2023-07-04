import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType, HttpRequest} from "@angular/common/http";
import * as docx from 'docx-preview'
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {IParentPartFile} from "../../../../../models/parent-part-equipment";

@Component({
  selector: 'app-viewing-files-position',
  templateUrl: './viewing-files-position.component.html',
  styleUrls: ['./viewing-files-position.component.scss']
})
export class ViewingFilesPositionComponent implements OnInit {

  constructor(private http: HttpClient, public dialog: MatDialog) {
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
