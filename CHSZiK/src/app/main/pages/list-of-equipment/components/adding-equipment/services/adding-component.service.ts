import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IPart} from "../../../../../../models/part-equipment";
import {Observable} from "rxjs";
import {ResponseDataParentPart, ResponseDataPart} from "../../../../../../models/response";
import {
  ADDFILE_URL,
  ADDINGPART_URL,
  ALLPART_URL, DELETEFILE_URL,
  DELETEPART_URL, NEWPARENTPART_URL,
  PARENTPART_URL, UPGRADENAME_URL,
  UPGRADEPART_URL
} from "../../../../../../conf/conf";

@Injectable({
  providedIn: 'root',
})

export class AddingComponentService {
  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) {
  }

  addFile(image: File, equipment_id: number) {
    const fd = new FormData()


    fd.append('image', image)

    fd.append('equipment_id', equipment_id.toString())

    return this.http.post(ADDFILE_URL, fd)
  }

  deleteFile(id: any) {
    return this.http.delete(DELETEFILE_URL + id)
  }

  addingPart(component: IPart) {
    return this.http.post(ADDINGPART_URL, component
    )
  }

  upgradePart(component: IPart) {
    return this.http.post(UPGRADEPART_URL, component)
  }

  deletePart(id: any) {
    return this.http.delete(DELETEPART_URL + id)
  }

  getParentPart(urlId: number): Observable<ResponseDataParentPart> {
    return this.http.get<ResponseDataParentPart>(PARENTPART_URL + urlId)
  }

  getAllPart(urlId: number): Observable<ResponseDataPart> {
    return this.http.get<ResponseDataPart>(ALLPART_URL + urlId)
  }

  createNewParentPart(equipment_name: string, image?: File) {
    const fd = new FormData()

    if (image) {
      fd.append('image', image)
    }
    fd.append('equipment_name', equipment_name)

    return this.http.post(NEWPARENTPART_URL, fd)
  }

  updateName(id: any, equipment_name: string) {
    const fd = new FormData()
    fd.append('id', id)
    fd.append('equipment_name', equipment_name)

    return this.http.post(UPGRADENAME_URL, fd)
  }
}
