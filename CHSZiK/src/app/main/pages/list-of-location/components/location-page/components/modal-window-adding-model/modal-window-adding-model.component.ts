import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-modal-window-adding-model',
  templateUrl: './modal-window-adding-model.component.html',
  styleUrls: ['./modal-window-adding-model.component.scss']
})
export class ModalWindowAddingModelComponent implements OnInit {
  constructor() {
  }
  @Output() send: EventEmitter<boolean> = new EventEmitter<boolean>()
  btnCloseModal() {
    return this.send.emit(false)
  }



  ngOnInit(): void {

  }

}
