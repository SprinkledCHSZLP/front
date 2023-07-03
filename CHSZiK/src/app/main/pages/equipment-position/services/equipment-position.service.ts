import {Injectable} from '@angular/core';
import {
  HttpClient,
} from '@angular/common/http';
import {ActivatedRoute, Router} from "@angular/router";
import {SHOWEQUIPMENTPOSITION_URL} from "../../../../conf/conf";
import {Observable} from "rxjs";
import {ResponseDataEquipmentPosition} from "../../../../models/response";

@Injectable({
  providedIn: 'root',
})
export class EquipmentPositionService {
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
  }

  getEquipmentPosition(id: number): Observable<ResponseDataEquipmentPosition> {
    return this.http.get<ResponseDataEquipmentPosition>(SHOWEQUIPMENTPOSITION_URL + id)
  }

}
