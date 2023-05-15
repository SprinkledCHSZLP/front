import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IPart} from "../../../../../../models/part-equipment";


@Injectable({
  providedIn: 'root',
})

export class AddingComponentService {
  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) {
  }

  addingComponent(component: IPart) {
    return this.http.post('http://192.168.0.117:8080/api/add_equipment_child', component
    )
  }

  upgradeComponent(upgradeComponent: IPart) {
    return this.http.post('http://192.168.0.117:8080/api/save_changes', upgradeComponent)

  }
}
