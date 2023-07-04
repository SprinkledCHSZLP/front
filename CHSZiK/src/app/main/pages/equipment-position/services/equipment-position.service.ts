import {Injectable} from '@angular/core';
import {
  HttpClient,
} from '@angular/common/http';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {
  ResponseDataPartEquipmentPosition,
  ResponseDataParentPart,
  ResponseDataParentEquipmentPosition
} from "../../../../models/response";
import {GETPARENTEQUIPMENTPOSITION_URL, GETPARTEQUIPMENTPOSITION_URL} from "../../../../conf/conf";

@Injectable({
  providedIn: 'root',
})
export class EquipmentPositionService {
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
  }

  getPartEquipmentPosition(id: number): Observable<ResponseDataPartEquipmentPosition> {
    return this.http.get<ResponseDataPartEquipmentPosition>(GETPARTEQUIPMENTPOSITION_URL + id)
  }
  getParentEquipmentPosition(id: number): Observable<ResponseDataParentEquipmentPosition> {
    return this.http.get<ResponseDataParentEquipmentPosition>(GETPARENTEQUIPMENTPOSITION_URL + id)
  }

}
