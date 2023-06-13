import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {
  CREATESPAREPART_URL,
  CREATETYPESPAREPART_URL,
  DELETETYPESPAREPARTS_URL, GETSPAREPART_URL,
  GETTYPESPAREPART_URL,
  GETTYPESPAREPARTS_URL
} from "../../../../conf/conf";
import {Observable} from "rxjs";
import {
  ResponseDataSparePart,
  ResponseDataTypeSparePart,
  ResponseDataTypeSpareParts
} from "../../../../models/response";

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
  }

  createTypeSparePart(component: {name: string, manufacturer: string, article: string, type_measure_units_id?: number}) {
    return this.http.post(CREATETYPESPAREPART_URL, component)
  }

  getTypeSpareParts(): Observable<ResponseDataTypeSpareParts> {
    return this.http.get<ResponseDataTypeSpareParts>(GETTYPESPAREPARTS_URL)
  }

  getTypeSparePart(id: number): Observable<ResponseDataTypeSparePart> {
    return this.http.get<ResponseDataTypeSparePart>(GETTYPESPAREPART_URL + id)
  }

  deleteTypeSpareParts(id: number) {
    return this.http.delete(DELETETYPESPAREPARTS_URL + id)
  }

  createSparePart(component: {type_parts_id: number, measure_units_id?: number, units?: number}) {
    return this.http.post(CREATESPAREPART_URL, component)
  }

  getSparePart(id: number): Observable<ResponseDataSparePart> {
    return this.http.get<ResponseDataSparePart>(GETSPAREPART_URL + id)
  }
}
