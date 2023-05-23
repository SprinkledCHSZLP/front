import {Injectable} from '@angular/core';
import {
  HttpClient,
} from '@angular/common/http';
import {Observable, of} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ResponseDataLocation, ResponseDataParentLocation} from "../../../../models/response";
import {ILocation} from "../../../../models/location";

@Injectable({
  providedIn: 'root',
})
export class ListOfLocationService {
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
  }

  location: ILocation[] = [
    {
      id: 1,
      location_name: 'TestLocation1'
    },
    {
      id: 2,
      location_name: 'TestLocation2'
    },
    {
      id: 3,
      location_name: 'TestLocation3'
    },
  ]

  parentLocation: ILocation = {
    id: 1,
    location_name: 'TestLocation1'
  }

  getAllLocation(): Observable<ResponseDataLocation> {
    return of({data: this.location})
  }

  getParantLocation(): Observable<ResponseDataParentLocation> {
    return of({data: this.parentLocation})
  }

}
