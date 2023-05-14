import {Injectable} from '@angular/core';
import {
  HttpClient,
} from '@angular/common/http';
import {map, Observable, of} from "rxjs";
import {IModel} from "../../../../models/models-equipment";
import {ResponseDataModels, ResponseDataParentPart, ResponseDataPart} from "../../../../models/response";
import {IPart} from "../../../../models/part-equipment";
import {AddingEquipmentComponent} from "../components/adding-equipment/layout/adding-equipment.component";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class ListOfEquipmentService {
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
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

  part: IPart[] = [
    {
      id: 1,
      position_on_plan: '1',
      equipment_name: 'Комплектующая которая разбивается1',
      have_equipment: true,
      service: false,
      parent_equipment_id: 1
    },
    {
      id: 2,
      position_on_plan: '2',
      equipment_name: 'Комплектующая которая разбивается2',
      have_equipment: false,
      service: true
    },
    {
      id: 3,
      position_on_plan: '3',
      equipment_name: 'Комплектующая которая разбивается3',
      have_equipment: true,
      service: true
    }
  ]

  getParentPart(urlId: number): Observable<ResponseDataParentPart> {
    return this.http.get<ResponseDataParentPart>('http://192.168.0.117:8080/api/equipment_data?parent_equipment_id=' + urlId)
  }

  addingNewParentModel(equipment_name: string, image: string) {
    this.http.post('http://192.168.0.117:8080/api/add_equipment', {
      equipment_name: equipment_name,
      image: image
    }).subscribe({
      next: (res: any) => {
        this.router.navigate(['adding-equipment/' + res])
        console.log('Успешно' + res)
      },
      error: (err) => {
        console.log('не успешно' + err)
      }
    })
  }

  getAllModels(): Observable<ResponseDataModels> {
    // return of({data: this.models})

     return this.http.get<ResponseDataModels>('http://192.168.0.117:8080/api/equipment')
  }

  // getAllPart(): Observable<ResponseDataPart> {
  //   return  of ({data: this.part})
  // }

  getAllPart(urlId:number): Observable<ResponseDataPart> {
    return this.http.get<ResponseDataPart>('http://192.168.0.117:8080/api/equipment_child?parent_equipment_id=' + urlId)
  }

}
