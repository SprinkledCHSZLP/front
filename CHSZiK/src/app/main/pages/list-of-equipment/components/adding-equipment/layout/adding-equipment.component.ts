import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {IPart} from "../../../../../../models/part-equipment";
import {ListOfEquipmentService} from "../../../services/list-of-equipment.service";
import {HttpClient} from "@angular/common/http";
import {AddingComponentService} from "../services/adding-component.service";
import {Subscription} from "rxjs";
import {IParentPart, IAddParentPart} from "../../../../../../models/parent-part-equipment";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-adding-equipment',
  templateUrl: './adding-equipment.component.html',
  styleUrls: ['./adding-equipment.component.scss']
})

export class AddingEquipmentComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private route: ActivatedRoute, private listOfEquipmentService: ListOfEquipmentService,
              private http: HttpClient, private addingComponentService: AddingComponentService) {
  }
  @ViewChild('input') inputRef: ElementRef
  addingNewModelForm!: FormGroup;
  sub$: Subscription = new Subscription()
  part: IPart[] = []
  parent: IParentPart
  parent_equipment_id: number
  isNew: boolean = true
  image: File



  btnBack() {
    window.history.back()
  }

  btnUpdateImage() {
    this.inputRef.nativeElement.click()
  }

  saveNewModel() {
    if(this.isNew) {
      this.listOfEquipmentService.create(
        this.addingNewModelForm.get('equipment_name')?.value,
        this.image
      ).subscribe( {
        next: (res: any) => {
          this.router.navigate(['adding-equipment/' + res])
          this.ifNotIsNew()
        }
      })
    }
    if(this.isNew == false) {
      this.listOfEquipmentService.createImage(
        this.parent_equipment_id,
        this.image
      ).subscribe( {
        next: (res: any) => {
          this.ifNotIsNew()
        }
      })
    }
  }

  getAllPart() {
    this.listOfEquipmentService.getAllPart(this.parent_equipment_id).subscribe((part) => {
      if (part) {
        this.part = part.data
      }
    })
  }

  getParentPart() {
    this.listOfEquipmentService.getParentPart(this.parent_equipment_id).subscribe((parent) => {
      if (parent) {
        this.parent = parent.data
      }
    })
  }

  addingComponent(component: IPart) {
    this.addingComponentService.addingComponent({
      ...component, parent_equipment_id: this.parent_equipment_id
    }).subscribe(() => {
      this.getAllPart()
    })
  }

  addingParentPart() {
//редактирование
  }

  onFileUpload(event: any) {
    const file = event.target.files[0]
    this.image = file

  }

  ifNotIsNew() {
    this.sub$.add(
      this.route.params.subscribe(params => {
        this.parent_equipment_id = params['id']
        if(this.parent_equipment_id != 0) {
          this.getAllPart()
          this.getParentPart()
        }
      })
    )
  }

  ngOnInit() {
    this.addingNewModelForm = new FormGroup({
      equipment_name: new FormControl(''),
    })

    this.route.params.subscribe(params => {
      this.parent_equipment_id = params['id']
      if (this.parent_equipment_id != 0) {
        this.isNew = false
      }
    })

    if(this.isNew == false) {
      this.ifNotIsNew()
    }
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe()
  }
}
