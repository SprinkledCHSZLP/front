import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CHECKTOKEN_URL} from "../../../conf/conf";

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get(CHECKTOKEN_URL).subscribe({
      next: () => {
        console.log('Токен верный')
      }
    })
  }

}
