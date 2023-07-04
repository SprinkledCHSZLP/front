import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";

import {ToastrService} from "ngx-toastr";
import {EquipmentPositionService} from "../services/equipment-position.service";
import {IParentPart, IParentPartFile} from "../../../../models/parent-part-equipment";
import {IParentEquipmentPosition} from "../../../../models/parent-equipment-position";
import {IPartEquipmentPosition} from "../../../../models/part-equipment-position";


@Component({
  selector: 'app-equipment-position',
  templateUrl: './equipment-position.component.html',
  styleUrls: ['./equipment-position.component.scss'],
})
export class EquipmentPositionComponent implements OnInit {


  constructor(private router: Router, private route: ActivatedRoute, private toastrService: ToastrService, private equipmentPositionService: EquipmentPositionService) {
  }
  parent_id: number
  loading = false
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
  }

  getParent() {
    this.equipmentPositionService.getParentEquipmentPosition(this.parent_id).subscribe((parent) => {
      if(parent) {
        this.parent = parent.data
        this.parentFileArr = parent.data.list_image
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
    this.route.params.subscribe(params => {
      this.parent_id = params['id']
      this.getParent()
      this.getPart()
    })
  }
}
