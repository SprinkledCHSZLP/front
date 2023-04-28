import {Injectable} from '@angular/core';
import {
  HttpClient,
} from '@angular/common/http';
import {Observable} from "rxjs";
import {IModel} from "../../../../models/models-equipment";

@Injectable({
  providedIn: 'root',
})
export class ListOfEquipmentService {
  constructor(private http: HttpClient) {
  }

  getAllModels(): Observable<IModel[]> {
    return this.http.get<IModel[]>('http://192.168.0.117:8080/api/equipment')
  }
}
