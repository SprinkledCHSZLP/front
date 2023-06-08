import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IPart} from "../../../../../../models/part-equipment";
import {ListOfEquipmentService} from "../../../services/list-of-equipment.service";
import {HttpClient, HttpEvent, HttpEventType, HttpRequest} from "@angular/common/http";
import {AddingComponentService} from "../services/adding-component.service";
import {Subscription} from "rxjs";
import {IParentPart} from "../../../../../../models/parent-part-equipment";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import * as docx from 'docx-preview'

@Component({
  selector: 'app-adding-equipment',
  templateUrl: './adding-equipment.component.html',
  styleUrls: ['./adding-equipment.component.scss']
})

export class AddingEquipmentComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private route: ActivatedRoute, private listOfEquipmentService: ListOfEquipmentService,
              private http: HttpClient, private addingComponentService: AddingComponentService, private toastrService: ToastrService) {
  }
  @ViewChild('render') render: ElementRef
  loading = true
  pdfSource: any
  @ViewChild('input') inputRef: ElementRef
  addingNewModelForm!: FormGroup;
  sub$: Subscription = new Subscription()
  part: IPart[] = []
  parent: IParentPart
  parent_equipment_id: number
  isNew: boolean = true
  updateName: boolean = false
  updateImage: boolean = false
  image: File | undefined
  parentFile: File
  pdfStr: boolean = false
  docx: boolean = false

  btnBack() {
    this.docx = false
    this.pdfStr = false
    this.loading = true
    if (this.parent) {
      if(this.parent.parent_equipment_id != null) {
        this.router.navigate(['adding-equipment/' + this.parent.parent_equipment_id])
      }
      if(this.parent.parent_equipment_id == null) {
        this.router.navigate(['list-of-equipment'])
      }
    }
    else {
      this.router.navigate(['list-of-equipment'])
    }
  }

  btnUpdateImage() {
    this.inputRef.nativeElement.click()
    this.updateImage = true
  }

  saveNewModel() {
    this.docx = false
    this.pdfStr = false
    if (this.isNew) {
      this.loading = true
      this.addingComponentService.createNewParentPart(
        this.addingNewModelForm.get('equipment_name')?.value,
        this.image
      ).subscribe({
        next: (res: any) => {
          this.image = undefined
          this.router.navigate(['adding-equipment/' + res])
          this.toastrService.success('Создана новая модель')
          this.ifNotIsNew()
        }
      })
    }
    if (this.isNew == false && this.updateImage && this.image) {
      this.addingComponentService.upgradeImage(
        this.parent_equipment_id,
        this.image
      ).subscribe({
        next: () => {
          this.inputRef.nativeElement.value = ''
          this.updateImage = false
          this.image = undefined
          this.toastrService.success('Схема обновлена')
          this.getParentPart()
        }
      })
    }
    if (this.updateName) {
      this.addingComponentService.updateName(
        this.parent_equipment_id,
        this.addingNewModelForm.get('equipment_name')?.value
      ).subscribe({
        next: () => {
          this.updateName = false
          this.toastrService.success('Наименование обновлено')
          this.getParentPart()
        }
      })
    }
  }

  getAllPart() {
    this.addingComponentService.getAllPart(this.parent_equipment_id).subscribe((part) => {
      if (part) {
        this.part = part.data
      }
    })
  }

  isParentImagePlanReference: boolean = false

  getParentPart() {
    this.isParentImagePlanReference = false
    this.addingComponentService.getParentPart(this.parent_equipment_id).subscribe((parent) => {
      if (parent) {
        this.parent = parent.data
        this.loading = false
        this.addingNewModelForm.patchValue(this.parent)
        if (this.parent.image_plan_reference != null) {
          this.isParentImagePlanReference = true
          if (this.parent.image_plan_reference.includes('.docx')) {
            this.getContactsDictionary(parent.data.image_plan_reference)
            this.docx = true
          }
          if (this.parent.image_plan_reference.includes('.pdf')) {
            this.pdfStr = true
          }

        }
      }
    })
  }

  addingPart(component: IPart) {
    this.addingComponentService.addingPart({
      ...component, parent_equipment_id: this.parent_equipment_id
    }).subscribe(() => {
      this.toastrService.success('Составляющая добавлена')
      this.getAllPart()
    })
  }

  upgradePart(component: IPart) {
    this.addingComponentService.upgradePart({
      ...component
    }).subscribe(() => {
      this.toastrService.success('Изменения сохранены')
      this.getAllPart()
    })
  }

  btnUpgradeHeadName() {
    this.updateName = true
  }

  onFileUpload(event: any) {
    this.updateImage = true
    this.image = event.target.files[0]
  }

  ifNotIsNew() {
    this.sub$.add(
      this.route.params.subscribe(params => {
        this.parent_equipment_id = params['id']
        if (this.parent_equipment_id != 0) {
          this.getAllPart()
          this.getParentPart()
        }
      })
    )
  }

  scroll() {

  }

  ngOnInit() {
    this.addingNewModelForm = new FormGroup({
      equipment_name: new FormControl('', Validators.required),
    })

    this.route.params.subscribe(params => {
      this.parent_equipment_id = params['id']
      if (this.parent_equipment_id != 0) {
        this.isNew = false
      }
    })
    if(this.isNew) {
      this.loading = false
    }

    if (this.isNew == false) {
      this.ifNotIsNew()
    }
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe()
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
}
