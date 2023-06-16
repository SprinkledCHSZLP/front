import {Component, EventEmitter, Output} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.scss']

})
export class ModalConfirmationComponent{
  constructor(public dialogRef: MatDialogRef<ModalConfirmationComponent>) {
  }
  @Output() sendConfirmation: EventEmitter<boolean> = new EventEmitter<boolean>()

  clickSendOk() {
    this.sendConfirmation.emit(true)
  }

  clickSendNo() {
    this.sendConfirmation.emit(false)

  }
}
