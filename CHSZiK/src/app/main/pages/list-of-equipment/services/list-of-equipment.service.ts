import {Injectable} from '@angular/core';
import {
  HttpClient,
} from '@angular/common/http';
import {map, Observable, of} from "rxjs";
import {IModel} from "../../../../models/models-equipment";
import {ResponseDataModels, ResponseDataPart} from "../../../../models/response";
import {IPart} from "../../../../models/part-equipment";

@Injectable({
  providedIn: 'root',
})
export class ListOfEquipmentService {
  constructor(private http: HttpClient) {
  }

  models: IModel[] = [
    {
      id: 1,
      equipmentName: "Залупа",
      imagePlanReference: "https://avatars.mds.yandex.net/i?id=6ee2742bc0d7d147a1b1454f175e52a3470c4091-8497871-images-thumbs&n=13"
    },
    {
      id: 2,
      equipmentName: "Залупа",
      imagePlanReference: "https://avatars.mds.yandex.net/i?id=6ee2742bc0d7d147a1b1454f175e52a3470c4091-8497871-images-thumbs&n=13"
    },
    {
      id: 3,
      equipmentName: "Залупа",
      imagePlanReference: "https://avatars.mds.yandex.net/i?id=6ee2742bc0d7d147a1b1454f175e52a3470c4091-8497871-images-thumbs&n=13"
    },
    {
      id: 4,
      equipmentName: "Залупа",
      imagePlanReference: "https://avatars.mds.yandex.net/i?id=6ee2742bc0d7d147a1b1454f175e52a3470c4091-8497871-images-thumbs&n=13"
    },
    {
      id: 5,
      equipmentName: "Залупа",
      imagePlanReference: "https://avatars.mds.yandex.net/i?id=6ee2742bc0d7d147a1b1454f175e52a3470c4091-8497871-images-thumbs&n=13"
    },
  ]

  part: IPart[] = [
    {
      id: 1,
      positionOnPlan: '1',
      equipmentName: 'Комплектующая которая разбивается1',
      haveEquipment: true,
      service: false
    },
    {
      id: 2,
      positionOnPlan: '2',
      equipmentName: 'Комплектующая которая разбивается2',
      haveEquipment: false,
      service: true
    },
    {
      id: 3,
      positionOnPlan: '3',
      equipmentName: 'Комплектующая которая разбивается3',
      haveEquipment: true,
      service: true
    }
  ]

  getAllModels(): Observable<ResponseDataModels> {
    return of({data: this.models})

     // return this.http.get<ResponseData>('http://192.168.43.248:8080/api/equipment')
  }

  getAllPart(): Observable<ResponseDataPart> {
    return  of ({data: this.part})
  }
}
