import {Injectable} from '@angular/core';
import {
  HttpClient,
} from '@angular/common/http';
import {map, Observable, of} from "rxjs";
import {IModel} from "../../../../models/models-equipment";
import {ResponseDataModels, ResponseDataParentPart, ResponseDataPart} from "../../../../models/response";
import {IPart} from "../../../../models/part-equipment";
import {ActivatedRoute, Router} from "@angular/router";
import {IAddParentPart} from "../../../../models/parent-part-equipment";

@Injectable({
  providedIn: 'root',
})
export class ListOfEquipmentService {
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
  }

  // models: IModel[] = []
  //
  // part: IPart[] = []


  getParentPart(urlId: number): Observable<ResponseDataParentPart> {
    return this.http.get<ResponseDataParentPart>('http://195.161.68.107:8000/api/equipment_data?parent_equipment_id=' + urlId)
  }

  addingNewParentModel(component: IAddParentPart) {
    return this.http.post('http://195.161.68.107:8000/api/add_equipment', component)
  }

  create(equipment_name: string, image?: File) {
    const fd = new FormData()

    if (image) {
      fd.append('image', image)
    }
    fd.append('equipment_name', equipment_name)

    return this.http.post('http://195.161.68.107:8000/api/add_equipment', fd)
  }

  createImage(id: any, image: File) {
    const fd = new FormData()

    if (image) {
      fd.append('image', image)
    }
    fd.append('id', id)

    return this.http.post('http://195.161.68.107:8000/api/change_image', fd)
  }

  updateName(id: any, equipment_name: string) {
    const fd = new FormData()
    fd.append('id', id)
    fd.append('equipment_name', equipment_name)

    return this.http.post('http://195.161.68.107:8000/api/change_name', fd)
  }

  getAllModels(): Observable<ResponseDataModels> {
    // return of({data: this.models})

    return this.http.get<ResponseDataModels>('http://195.161.68.107:8000/api/equipment')
  }

  // getAllPart(): Observable<ResponseDataPart> {
  //   return  of ({data: this.part})
  // }

  getAllPart(urlId: number): Observable<ResponseDataPart> {
    return this.http.get<ResponseDataPart>('http://195.161.68.107:8000/api/equipment_child?parent_equipment_id=' + urlId)
  }

  deleteModel(id: any) {
    return this.http.delete('http://195.161.68.107:8000/api/delete_equipment?id=' + id)
  }

}
