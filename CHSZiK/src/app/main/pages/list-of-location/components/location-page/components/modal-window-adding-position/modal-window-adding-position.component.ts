import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-modal-window-adding-position',
  templateUrl: './modal-window-adding-position.component.html',
  styleUrls: ['./modal-window-adding-position.component.scss']
})
export class ModalWindowAddingPositionComponent implements OnInit {
  constructor() {
  }
  @Output() send: EventEmitter<boolean> = new EventEmitter<boolean>()
  btnCloseModal() {
    return this.send.emit(false)
  }



  ngOnInit(): void {

  }

}
