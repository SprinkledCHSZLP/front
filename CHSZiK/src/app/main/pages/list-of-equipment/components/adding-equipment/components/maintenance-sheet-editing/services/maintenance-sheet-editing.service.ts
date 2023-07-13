import {Injectable} from '@angular/core';
import {
  HttpClient,
} from '@angular/common/http';
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {
  ADDCONSUMABLE_URL,
  ADDDETAIL_URL, ADDFILEBYTYPESPAREPART_URL, ADDFILEINSERVICE_URL,
  ADDTOOL_URL, DELETECONSUMABLE_URL,
  DELETEDETAIL_URL, DELETEFILE_URL, DELETEFILEINSERVICE_URL,
  DELETETOOL_URL,
  SHOWCONSUMABLESAUTOCOMPLETE_URL,
  SHOWDETAILSAUTOCOMPLETE_URL,
  SHOWLISTCONSUMABLES_URL,
  SHOWLISTDETAILS_URL,
  SHOWLISTTOOLS_URL, SHOWSERVICE_URL,
  SHOWTOOLSAUTOCOMPLETE_URL
} from "../../../../../../../../conf/conf";
import {
  ResponseDataListConsumables,
  ResponseDataListDetails,
  ResponseDataListTools, ResponseDataParentService
} from "../../../../../../../../models/response";
import {IDetails} from "../../../../../../../../models/list-details";
import {IConsumables} from "../../../../../../../../models/list-consumables";

@Injectable({
  providedIn: 'root',
})
export class MaintenanceSheetEditingService {
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
  }

  addTool(component: { tool_name: string | null, quantity: number, service_id: number }) {
    return this.http.post(ADDTOOL_URL, component)
  }

  addDetail(component: { sort_id: number, quantity: number, service_id: number }) {
    return this.http.post(ADDDETAIL_URL, component)
  }

  addConsumable(component: { sort_id: number, quantity: number, service_id: number }) {
    return this.http.post(ADDCONSUMABLE_URL, component)
  }

  getAutocompleteTools(): Observable<{ data: [string] }> {
    return this.http.get<{ data: [string] }>(SHOWTOOLSAUTOCOMPLETE_URL)
  }

  getAutocompleteDetails(): Observable<{ data: IDetails[] }> {
    return this.http.get<{ data: IDetails[] }>(SHOWDETAILSAUTOCOMPLETE_URL)
  }

  getAutocompleteConsumables(): Observable<{ data: IConsumables[] }> {
    return this.http.get<{ data: IConsumables[] }>(SHOWCONSUMABLESAUTOCOMPLETE_URL)
  }

  deleteTool(id: number) {
    return this.http.delete(DELETETOOL_URL + id)
  }

  deleteDetail(id: number) {
    return this.http.delete(DELETEDETAIL_URL + id)
  }

  deleteConsumable(id: number) {
    return this.http.delete(DELETECONSUMABLE_URL + id)
  }

  getListTools(id: number): Observable<ResponseDataListTools> {
    return this.http.get<ResponseDataListTools>(SHOWLISTTOOLS_URL + id)
  }

  getListConsumables(id: number): Observable<ResponseDataListConsumables> {
    return this.http.get<ResponseDataListConsumables>(SHOWLISTCONSUMABLES_URL + id)
  }

  getListDetails(id: number): Observable<ResponseDataListDetails> {
    return this.http.get<ResponseDataListDetails>(SHOWLISTDETAILS_URL + id)
  }

  getParentService(id: number): Observable<ResponseDataParentService> {
    return this.http.get<ResponseDataParentService>(SHOWSERVICE_URL + id)
  }

  addFile(file: File, service_id: number) {
    const fd = new FormData()


    fd.append('file', file)

    fd.append('service_id', service_id.toString())

    return this.http.post(ADDFILEINSERVICE_URL, fd)
  }
  deleteFile(id: any) {
    return this.http.delete(DELETEFILEINSERVICE_URL + id)
  }
}
