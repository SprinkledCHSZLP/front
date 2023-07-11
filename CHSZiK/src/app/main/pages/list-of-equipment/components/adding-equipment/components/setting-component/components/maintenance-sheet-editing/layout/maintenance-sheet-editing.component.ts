import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Form, FormControl, FormGroup, Validators} from "@angular/forms";
import {MaintenanceSheetEditingService} from "../services/maintenance-sheet-editing.service";
import {map, Observable, startWith, Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {IListTools} from "../../../../../../../../../../models/list-tools";
import {MatDialog} from "@angular/material/dialog";
import {ModalConfirmationComponent} from "../../../../../../../../modal-confirmation/modal-confirmation.component";
import {IDetails, IListDetails} from "../../../../../../../../../../models/list-details";
import {IConsumables, IListConsumables} from "../../../../../../../../../../models/list-consumables";
import {IParentService} from "../../../../../../../../../../models/parent-service";

@Component({
  selector: 'app-maintenance-sheet-editing',
  templateUrl: './maintenance-sheet-editing.component.html',
  styleUrls: ['./maintenance-sheet-editing.component.scss']
})

export class MaintenanceSheetEditingComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private maintenanceSheetEditingService: MaintenanceSheetEditingService, private route: ActivatedRoute, private toastrService: ToastrService, public dialog: MatDialog) {
  }
  loading: boolean = true

  sub$: Subscription = new Subscription()
  parent_id: number
  addToolForm!: FormGroup
  addDetailForm!: FormGroup
  addConsumableForm!: FormGroup
  listTools: IListTools[] = []
  listDetails: IListDetails[] = []
  listConsumables: IListConsumables[] = []
  parentService: IParentService

  tools: string[] = []
  toolControl = new FormControl('', [Validators.required]);
  optionsTool: string[] = this.tools
  filteredOptionsTools: Observable<string[]>;

  details: IDetails[] = []
  detailControl = new FormControl('', [Validators.required]);
  optionsDetail: IDetails[] = this.details
  filteredOptionsDetails: Observable<IDetails[]>;

  consumables: IConsumables[] = []
  consumableControl = new FormControl('', [Validators.required]);
  optionsConsumable: IConsumables[] = this.consumables
  filteredOptionsConsumables: Observable<IConsumables[]>;

  private filterTools(tools: string): string[] {
    const filterValue = tools.toLowerCase();
    return this.optionsTool.filter(option => option.toLowerCase().includes(filterValue));
  }

  private filterDetails(details: string): IDetails[] {
    const filterValue = details.toLowerCase();
    return this.details.filter(option => option.sort_name.toLowerCase().includes(filterValue));
  }

  private filterConsumables(consumables: string): IConsumables[] {
    const filterValue = consumables.toLowerCase();
    return this.consumables.filter(option => option.sort_name.toLowerCase().includes(filterValue));
  }

  btnBack() {
    window.history.back()
  }

  addTool() {
    this.maintenanceSheetEditingService.addTool({
      tool_name: this.toolControl.value,
      quantity: this.addToolForm.get('quantity')?.value,
      service_id: this.parent_id
    }).subscribe(() => {
      this.toastrService.success('Инструмент добавлен')
      this.getListTools()
      this.addToolForm.reset()
      this.toolControl.reset()
    })
  }

  addDetail() {
    this.maintenanceSheetEditingService.addDetail({
      sort_id: this.details.filter((sort_name) => {
        return sort_name.sort_name == this.detailControl.value
      })[0].id,
      quantity: this.addDetailForm.get('quantity')?.value,
      service_id: this.parent_id
    }).subscribe(() => {
      this.toastrService.success('Запчасть добавлена')
      this.getListDetails()
      this.addDetailForm.reset()
      this.detailControl.reset()
    })
  }

  addConsumable() {
    this.maintenanceSheetEditingService.addConsumable({
      sort_id: this.consumables.filter((sort_name) => {
        return sort_name.sort_name == this.consumableControl.value
      })[0].id,
      quantity: this.addConsumableForm.get('quantity')?.value,
      service_id: this.parent_id
    }).subscribe(() => {
      this.toastrService.success('Расходный материал добавлен')
      this.getListConsumables()
      this.addConsumableForm.reset()
      this.consumableControl.reset()
    })
  }

  getToolAutocomplete() {
    this.maintenanceSheetEditingService.getAutocompleteTools().subscribe((tools) => {
      if (tools) {
        this.tools = tools.data
        this.optionsTool = this.tools

        if(this.tools) {
          this.filteredOptionsTools = this.toolControl.valueChanges.pipe(
            startWith(''),
            map(value => this.filterTools(value || '')),
          );
        }
      }
    })
  }

  getDetailAutocomplete() {
    this.maintenanceSheetEditingService.getAutocompleteDetails().subscribe((details) => {
      if (details) {
        this.details = details.data
        this.optionsDetail = this.details

        if(this.details) {
          this.filteredOptionsDetails = this.detailControl.valueChanges.pipe(
            startWith(''),
            map(value => (value ? this.filterDetails(value) : this.details.slice())),
          );
        }
      }
    })
  }

  getConsumableAutocomplete() {
    this.maintenanceSheetEditingService.getAutocompleteConsumables().subscribe((consumables) => {
      if (consumables) {
        this.consumables = consumables.data
        this.optionsConsumable = this.consumables

        if(this.consumables) {
          this.filteredOptionsConsumables = this.consumableControl.valueChanges.pipe(
            startWith(''),
            map(value => (value ? this.filterConsumables(value) : this.consumables.slice())),
          );
        }
      }
    })
  }

  deteleTool(id: number) {
    this.dialog.open(ModalConfirmationComponent).componentInstance.sendConfirmation.subscribe((send) => {
        if (send) {
          this.maintenanceSheetEditingService.deleteTool(id).subscribe(() => {
            this.getListTools()
            this.toastrService.success('Инструмент удалён')
          })
        }
      }
    )
  }

  deleteDetail(id: number) {
    this.dialog.open(ModalConfirmationComponent).componentInstance.sendConfirmation.subscribe((send) => {
        if (send) {
          this.maintenanceSheetEditingService.deleteDetail(id).subscribe(() => {
            this.getListDetails()
            this.toastrService.success('Запчасть удалена')
          })
        }
      }
    )
  }

  deleteConsumable(id: number) {
    this.dialog.open(ModalConfirmationComponent).componentInstance.sendConfirmation.subscribe((send) => {
        if (send) {
          this.maintenanceSheetEditingService.deleteConsumable(id).subscribe(() => {
            this.getListConsumables()
            this.toastrService.success('Расходный материал удалён')
          })
        }
      }
    )
  }

  getListTools() {
    this.maintenanceSheetEditingService.getListTools(this.parent_id).subscribe((listTools) => {
      if (listTools) {
        this.listTools = listTools.data
      }
    })
  }

  getListDetails() {
    this.maintenanceSheetEditingService.getListDetails(this.parent_id).subscribe((listDetails) => {
      if (listDetails) {
        this.listDetails = listDetails.data
      }
    })
  }

  getListConsumables() {
    this.maintenanceSheetEditingService.getListConsumables(this.parent_id).subscribe((listConsumables) => {
      if (listConsumables) {
        this.listConsumables = listConsumables.data
      }
    })
  }

  getParentService() {

  }

  ngOnInit(): void {
    this.sub$.add(
      this.route.params.subscribe(params => {
        this.parent_id = params['id']
        this.maintenanceSheetEditingService.getParentService(this.parent_id).subscribe((parentService) => {
          if(parentService) {
            this.parentService = parentService.data
            this.loading = false
          }
        })
      })
    )
    this.getListTools()
    this.getListDetails()
    this.getListConsumables()
    this.getDetailAutocomplete()
    this.getToolAutocomplete()
    this.getConsumableAutocomplete()

    this.addConsumableForm = new FormGroup({
      quantity: new FormControl('', [Validators.required])
    })

    this.addDetailForm = new FormGroup({
      quantity: new FormControl('', [Validators.required])
    })

    this.addToolForm = new FormGroup({
      quantity: new FormControl('', [Validators.required]),
      tool_name: new FormControl('')
    })
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe()
  }

  selectedOption(value: any) {
    console.log(value)
  }
}
