import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IPart} from "../../../../../../models/part-equipment";
import {Observable} from "rxjs";
import {ResponseDataParentPart, ResponseDataPart} from "../../../../../../models/response";
import {
  ADDINGPART_URL,
  ALLPART_URL,
  DELETEPART_URL, NEWPARENTPART_URL,
  PARENTPART_URL, UPGRADEIMAGE_URL, UPGRADENAME_URL,
  UPGRADEPART_URL
} from "../../../../../../conf/conf";


@Injectable({
  providedIn: 'root',
})

export class AddingComponentService {
  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) {
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

  upgradeImage(id: any, image: File) {
    const fd = new FormData()

    if (image) {
      fd.append('image', image)
    }
    fd.append('id', id)

    return this.http.post(UPGRADEIMAGE_URL, fd)
  }

  updateName(id: any, equipment_name: string) {
    const fd = new FormData()
    fd.append('id', id)
    fd.append('equipment_name', equipment_name)

    return this.http.post(UPGRADENAME_URL, fd)
  }
}
