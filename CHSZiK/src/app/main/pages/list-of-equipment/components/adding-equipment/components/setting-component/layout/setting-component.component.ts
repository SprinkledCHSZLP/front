import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IPart} from "../../../../../../../../models/part-equipment";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AddingComponentService} from "../../../services/adding-component.service";
import {AddingEquipmentComponent} from "../../../layout/adding-equipment.component";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {ModalConfirmationComponent} from "../../../../../../modal-confirmation/modal-confirmation.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-setting-component',
  templateUrl: './setting-component.component.html',
  styleUrls: ['./setting-component.component.scss']
})
export class SettingComponentComponent implements OnInit {

  upgradeComponentForm!: FormGroup
  @Output() send: EventEmitter<IPart> = new EventEmitter<IPart>()
  isUpgrade: boolean = false
  @Input() part: IPart
  subConfirmation$: Subscription = new Subscription()

  constructor(private router: Router, private route: ActivatedRoute, private addingComponentService: AddingComponentService, private addingEquipmentComponent: AddingEquipmentComponent, private toastrService: ToastrService, public dialog: MatDialog) {
  }

  btnDeletePart() {
    this.dialog.open(ModalConfirmationComponent).componentInstance.sendConfirmation.subscribe((send) => {
        if (send) {
          this.addingComponentService.deletePart(this.part.id).subscribe({
            next: () => {
              this.toastrService.success('Составляющая удалена')
              this.addingEquipmentComponent.getAllPart()
            }
          })
        }
      }
    )
    // this.subConfirmation$.add(
    //   this.dialog.open(ModalConfirmationComponent).componentInstance.sendConfirmation.subscribe((send) => {
    //     if(send) {
    //
    //     }
    //     if(!send) {
    //       this.subConfirmation$.unsubscribe()
    //     }
    //   })
    // )

    // this.addingComponentService.deletePart(this.part.id).subscribe( {
    //   next: () => {
    //     this.toastrService.success('Составляющая удалена')
    //     this.addingEquipmentComponent.getAllPart()
    //   }
    // })
  }

  openUpgradePart() {
    this.isUpgrade = true
  }

  upgradePart() {
    let component: IPart = {
      id: this.part.id,
      position_on_plan: this.upgradeComponentForm.get('position_on_plan')?.value,
      equipment_name: this.upgradeComponentForm.get('equipment_name')?.value,
      have_equipment: this.upgradeComponentForm.get('have_equipment')?.value,
      service: this.upgradeComponentForm.get('service')?.value,
    }
    this.send.emit(component)
    this.isUpgrade = false
  }

  openSettings() {
    this.addingEquipmentComponent.docx = false
    this.addingEquipmentComponent.pdfStr = false
    this.addingEquipmentComponent.loading = true
    this.router.navigate(['adding-equipment', this.part.id])
  }

  submitMainTenanceSheetEditing() {
    this.router.navigate(['maintenance-sheet-editing', this.part.id])
  }

  ngOnInit(): void {
    this.upgradeComponentForm = new FormGroup({
      position_on_plan: new FormControl(''),
      equipment_name: new FormControl('', [Validators.required]),
      have_equipment: new FormControl(true || false),
      service: new FormControl(true || false)
    })
  }

}
