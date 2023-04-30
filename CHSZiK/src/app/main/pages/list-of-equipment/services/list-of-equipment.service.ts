import {Injectable} from '@angular/core';
import {
  HttpClient,
} from '@angular/common/http';
import {map, Observable, of} from "rxjs";
import {IModel} from "../../../../models/models-equipment";
import {ResponseData} from "../../../../models/response";

@Injectable({
  providedIn: 'root',
})
export class ListOfEquipmentService {
  constructor(private http: HttpClient) {
  }

  models: IModel[] = [
    {
      id: 1,
      equipment_name: "Залупа",
      image_plan_reference: "https://avatars.mds.yandex.net/i?id=6ee2742bc0d7d147a1b1454f175e52a3470c4091-8497871-images-thumbs&n=13"
    },
    {
      id: 2,
      equipment_name: "Залупа",
      image_plan_reference: "https://avatars.mds.yandex.net/i?id=6ee2742bc0d7d147a1b1454f175e52a3470c4091-8497871-images-thumbs&n=13"
    },
    {
      id: 3,
      equipment_name: "Залупа",
      image_plan_reference: "https://avatars.mds.yandex.net/i?id=6ee2742bc0d7d147a1b1454f175e52a3470c4091-8497871-images-thumbs&n=13"
    },
    {
      id: 4,
      equipment_name: "Залупа",
      image_plan_reference: "https://avatars.mds.yandex.net/i?id=6ee2742bc0d7d147a1b1454f175e52a3470c4091-8497871-images-thumbs&n=13"
    },
    {
      id: 5,
      equipment_name: "Залупа",
      image_plan_reference: "https://avatars.mds.yandex.net/i?id=6ee2742bc0d7d147a1b1454f175e52a3470c4091-8497871-images-thumbs&n=13"
    },
  ]

  getAllModels(): Observable<ResponseData> {
    return of({data: this.models})
    //
    // return this.http.get<ResponseData>('http://192.168.0.117:8080/api/equipment').pipe(
    //   map((res:any)=>{return {data: this.models}})
    // )
  }
}
