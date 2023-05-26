import {Injectable} from '@angular/core';
import {
  HttpClient,
} from '@angular/common/http';
import {Observable, of} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ResponseDataLocation, ResponseDataParentLocation} from "../../../../models/response";
import {ILocation} from "../../../../models/location";
import {
  ADDINGLOCATION_URL,
  ALLLOCATION_URL,
  CHANGELOCATION_URL, DELETELOCATION_URL,
  PARENTLOCATION_URL,
  SPLITLOCATION_URL
} from "../../../../conf/conf";

@Injectable({
  providedIn: 'root',
})
export class ListOfLocationService {
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
  }

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
}
