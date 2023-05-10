import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AddingComponentService {
  constructor(private router: Router, private http: HttpClient) {
  }

  addingComponent(positionOnPlan: string, equipmentName: string, haveEquipment: boolean, service: boolean) {
    this.http.post('http://192.168.43.248:8080/api/add_equipment', {
      positionOnPlan: positionOnPlan,
      equipmentName: equipmentName,
      haveEquipment: haveEquipment,
      service: service
    }).subscribe({
      complete: () => {
        console.log('всё чётко')
      },
      error: (err) => {
        console.log('Отказ')
      }
    })


  }


}
