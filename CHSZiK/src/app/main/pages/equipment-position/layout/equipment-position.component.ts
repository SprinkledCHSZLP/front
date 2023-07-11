import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";

import {ToastrService} from "ngx-toastr";
import {EquipmentPositionService} from "../services/equipment-position.service";
import {IParentPart, IParentPartFile} from "../../../../models/parent-part-equipment";
import {IParentEquipmentPosition} from "../../../../models/parent-equipment-position";
import {IPartEquipmentPosition} from "../../../../models/part-equipment-position";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-equipment-position',
  templateUrl: './equipment-position.component.html',
  styleUrls: ['./equipment-position.component.scss'],
})
export class EquipmentPositionComponent implements OnInit, OnDestroy {


  constructor(private router: Router, private route: ActivatedRoute, private toastrService: ToastrService, private equipmentPositionService: EquipmentPositionService) {
  }
  sub$: Subscription = new Subscription()
  parent_id: number
  loading = true
  parent: IParentEquipmentPosition
  part: IPartEquipmentPosition[] = []
  parentFileArr: IParentPartFile[] = []

  @ViewChild('addingImgModelLine') addingImgModelLine: ElementRef;
  @ViewChild('content') content: ElementRef;

  scrollRight() {
    const wrapper = this.addingImgModelLine.nativeElement;
    const distance = wrapper.offsetWidth;
    wrapper.scrollLeft -= distance;
  }
  scrollLeft() {
    const wrapper = this.addingImgModelLine.nativeElement;
    const distance = -wrapper.offsetWidth;
    wrapper.scrollLeft -= distance;
  }

  btnBack() {
    window.history.back()
    this.loading = true
  }

  getParent() {
    this.equipmentPositionService.getParentEquipmentPosition(this.parent_id).subscribe((parent) => {
      if(parent) {
        this.parent = parent.data
        this.parentFileArr = parent.data.list_image
        this.loading = false
      }
    })
  }

  getPart() {
    this.equipmentPositionService.getPartEquipmentPosition(this.parent_id).subscribe((part) => {
      if(part) {
        this.part = part.data
      }
    })
  }

  ngOnInit(): void {
    this.sub$.add(
      this.route.params.subscribe(params => {
        this.parent_id = params['id']
        this.getParent()
        this.getPart()
      })
    )
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe()
  }
}
