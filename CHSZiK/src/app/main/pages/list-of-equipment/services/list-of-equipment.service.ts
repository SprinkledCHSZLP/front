import {Injectable} from '@angular/core';
import {
  HttpClient,
} from '@angular/common/http';
import {Observable} from "rxjs";
import {ResponseDataModels} from "../../../../models/response";
import {ActivatedRoute, Router} from "@angular/router";
import {ALLMODELS_URL, DELETEMODEL_URL} from "../../../../conf/conf";

@Injectable({
  providedIn: 'root',
})
export class ListOfEquipmentService {
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
  }

  getAllModels(): Observable<ResponseDataModels> {
    return this.http.get<ResponseDataModels>(ALLMODELS_URL)
  }

  deleteModel(id: any) {
    return this.http.delete(DELETEMODEL_URL + id)
  }

}
