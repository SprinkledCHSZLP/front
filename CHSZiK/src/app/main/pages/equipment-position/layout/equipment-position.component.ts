import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";

import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-equipment-position',
  templateUrl: './equipment-position.component.html',
  styleUrls: ['./equipment-position.component.scss'],
})
export class EquipmentPositionComponent implements OnInit {


  constructor(private router: Router, private route: ActivatedRoute, private toastrService: ToastrService) {
  }
  loading = true
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

  ngOnInit(): void {
  }
}
