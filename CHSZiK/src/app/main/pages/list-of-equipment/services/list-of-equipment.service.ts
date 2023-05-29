import {Injectable} from '@angular/core';
import {
  HttpClient,
} from '@angular/common/http';
import {Observable} from "rxjs";
import {ResponseDataModels, ResponseDataPosition} from "../../../../models/response";
import {ActivatedRoute, Router} from "@angular/router";
import {
  ALLMODELS_URL,
  DELETEMODEL_URL,
  DELETEPOSITION_URL,
  GETALLPOSITION_URL
} from "../../../../conf/conf";

@Injectable({
  providedIn: 'root',
})
export class ListOfEquipmentService {
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
  }

  getAllModels(): Observable<ResponseDataModels> {
    return this.http.get<ResponseDataModels>(ALLMODELS_URL)
  }

  deleteModel(id: number) {
    return this.http.delete(DELETEMODEL_URL + id)
  }

  deletePosition(group_id: string) {
    return this.http.delete(DELETEPOSITION_URL + group_id)
  }

  getAllPosition(equipment_id: number): Observable<ResponseDataPosition> {
    return this.http.get<ResponseDataPosition>(GETALLPOSITION_URL + equipment_id)
  }

}
