import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {
  ADDFILE_URL,
  ADDFILEBYTYPESPAREPART_URL,
  CHANGEGROUPINWAREHOUSE_URL,
  CHANGETYPESPAREPART_URL,
  CREATESPAREPART_URL,
  CREATETYPESPAREPART_URL, CREATEWAREHOUSEGROUP_URL, DELETEFILEBYTYPESPAREPART_URL, DELETEGROUPINWAREHOUSE_URL,
  DELETETYPESPAREPARTS_URL, GETGROUPSINWAREHOUSE_URL, GETGROUPWAREHOUSE_URL, GETSPAREPART_URL,
  GETTYPESPAREPART_URL,
  GETTYPESPAREPARTS_URL
} from "../../../../conf/conf";
import {Observable} from "rxjs";
import {
  ResponseDataGroupInWarehouse,
  ResponseDataGroupsInWarehouse,
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

  createTypeSparePart(component: { name: string, manufacturer: string, article: string, type_measure_units_id?: number, group_id: number}) {
    return this.http.post(CREATETYPESPAREPART_URL, component)
  }

  createGroup(component: {name: string, type_measure_units_id?: number}) {
    return this.http.post(CREATEWAREHOUSEGROUP_URL, component)
  }

  getGroupInWarehouse(group_id: number): Observable<ResponseDataGroupInWarehouse> {
    return this.http.get<ResponseDataGroupInWarehouse>(GETGROUPWAREHOUSE_URL + group_id)

  }

  deleteGroupInWarehouse(id: number) {
    return this.http.delete(DELETEGROUPINWAREHOUSE_URL + id)
  }

  addFileByTypeSparePart(image: File, type_part_id: number) {
    const fd = new FormData()


    fd.append('image', image)

    fd.append('type_part_id', type_part_id.toString())

    return this.http.post(ADDFILEBYTYPESPAREPART_URL, fd)
  }

  deleteFileByTypeSparePart(id: number) {
    return this.http.delete(DELETEFILEBYTYPESPAREPART_URL + id)
  }

  changeGroupInWarehouse(component: {id: number, name: string}) {
    return this.http.post(CHANGEGROUPINWAREHOUSE_URL, component)
  }

  getTypeSpareParts(id:number): Observable<ResponseDataTypeSpareParts> {
    return this.http.get<ResponseDataTypeSpareParts>(GETTYPESPAREPARTS_URL + id)
  }

  getGroupsInWarehouse(): Observable<ResponseDataGroupsInWarehouse> {
    return this.http.get<ResponseDataGroupsInWarehouse>(GETGROUPSINWAREHOUSE_URL)
  }

  getTypeSparePart(id: number): Observable<ResponseDataTypeSparePart> {
    return this.http.get<ResponseDataTypeSparePart>(GETTYPESPAREPART_URL + id)
  }

  deleteTypeSpareParts(id: number) {
    return this.http.delete(DELETETYPESPAREPARTS_URL + id)
  }

  createSparePart(component: { type_parts_id: number, measure_units_id?: number, units?: number }) {
    return this.http.post(CREATESPAREPART_URL, component)
  }

  getSparePart(id: number): Observable<ResponseDataSparePart> {
    return this.http.get<ResponseDataSparePart>(GETSPAREPART_URL + id)
  }

  changeTypeSparePart(component: { id: number, article?: string, name?: string, price?: number, manufacturer?: string }) {
    return this.http.post(CHANGETYPESPAREPART_URL, component)
  }
}
