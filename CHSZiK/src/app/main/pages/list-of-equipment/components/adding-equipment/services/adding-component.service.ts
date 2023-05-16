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
    return this.http.post('http://195.161.68.107:8000/api/add_equipment_child', component
    )
  }

  upgradeComponent(upgradeComponent: IPart) {
    return this.http.post('http://195.161.68.107:8000/api/save_changes', upgradeComponent)
  }

  deleteComponent(id: any) {
    return this.http.delete('http://195.161.68.107:8000/api/delete_equipment?id=' + id)
  }
}
