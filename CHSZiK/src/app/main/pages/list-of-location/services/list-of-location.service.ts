import {Injectable} from '@angular/core';
import {
  HttpClient,
} from '@angular/common/http';
import {Observable, of, Subject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ResponseDataLocation, ResponseDataParentLocation, ResponseDataPosition} from "../../../../models/response";
import {ILocation} from "../../../../models/location";
import {
  ADDINGLOCATION_URL, ADDINGNEWPOSITION_URL, ADDINGTOLOCATION_URL,
  ALLLOCATION_URL,
  CHANGELOCATION_URL, DELETELOCATION_URL, DELETEPOSITIONMODEL_URL, GETPOSITION_URL,
  PARENTLOCATION_URL, SHOWPOSITION_URL,
  SPLITLOCATION_URL
} from "../../../../conf/conf";
import {IPosition} from "../../../../models/position";

@Injectable({
  providedIn: 'root',
})
export class ListOfLocationService {
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
  }
  update$: Subject<null> = new Subject<null>()

  getAllLocation(urlId: number): Observable<ResponseDataLocation> {
    return this.http.get<ResponseDataLocation>(ALLLOCATION_URL + urlId)
  }

  getParentLocation(urlId: number): Observable<ResponseDataParentLocation> {
    return this.http.get<ResponseDataParentLocation>(PARENTLOCATION_URL + urlId)
  }

  addingLocation(component: ILocation) {
    return this.http.post(ADDINGLOCATION_URL, component)
  }

  splitLocation(id: { id: number }) {
    return this.http.post(SPLITLOCATION_URL, id)
  }

  changeLocation(component: ILocation) {
    return this.http.post(CHANGELOCATION_URL, component)
  }

  deleteLocation(id: number) {
    return this.http.delete(DELETELOCATION_URL + id)
  }

  getPosition(equipment_id: number): Observable<ResponseDataPosition> {
    return this.http.get<ResponseDataPosition>(GETPOSITION_URL + equipment_id)
  }

  addingNewPosition(component: {equipment_id: number, position: string}) {
    return this.http.post(ADDINGNEWPOSITION_URL, component)
  }

  addPositionInLocation(component: {locations_id: string, id: number}) {
    return this.http.post(ADDINGTOLOCATION_URL, component)
  }

  getPositionModels(location_id: number): Observable<ResponseDataPosition> {
    return this.http.get<ResponseDataPosition>(SHOWPOSITION_URL + location_id)
  }
  deletePositionModel(id: number) {
    return this.http.post(DELETEPOSITIONMODEL_URL, {id: id})
  }
}
