import {Component, OnInit} from '@angular/core';
import {ErrorInterceptor} from "../../../error-handler/interseptors/error.interseptor";

@Component({
  selector: 'app-global-error',
  templateUrl: './global-error.component.html',
  styleUrls: ['./global-error.component.scss']
})
export class GlobalErrorComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
