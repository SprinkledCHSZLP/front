import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-of-equipment',
  templateUrl: './list-of-equipment.component.html',
  styleUrls: ['./list-of-equipment.component.scss'],
})
export class ListOfEquipmentComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://192.168.0.117:8080/api/check_token').subscribe({
      next: () => {
        console.log('asdasd');
      },
    });
  }
}
