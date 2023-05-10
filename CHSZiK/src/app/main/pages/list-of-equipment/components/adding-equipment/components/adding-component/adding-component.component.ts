import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AddingComponentService} from "./adding-component.service";

@Component({
  selector: 'app-adding-component',
  templateUrl: './adding-component.component.html',
  styleUrls: ['./adding-component.component.scss']
})
export class AddingComponentComponent implements OnInit{
  addingForm!: FormGroup
  constructor(private router: Router,
              private addingComponentService: AddingComponentService,
              private http: HttpClient) {
  }

  saveComponent() {
    this.addingComponentService.addingComponent(
      this.addingForm.get('position')?.value,
      this.addingForm.get('name')?.value,
      this.addingForm.get('constituents')?.value,
      this.addingForm.get('service')?.value
    )
  }


  ngOnInit(): void {
    this.addingForm = new FormGroup({
      position: new FormControl(''),
      name: new FormControl(''),
      constituents: new FormControl(true || false),
      service: new FormControl(true || false),
    });
  }

}
