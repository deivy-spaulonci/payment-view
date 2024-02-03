import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {MessageService} from "primeng/api";
import {Despesa} from "../../../model/despesa";
import {Fornecedor} from "../../../model/fornecedor";
import {ListdespesaComponent} from "../despesa/listdespesa/listdespesa.component";
import {ListfornecedorComponent} from "./listfornecedor/listfornecedor.component";
import {DefaultService} from "../../../sevice/default.service";

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrl: './fornecedor.component.css',
  providers: [MessageService]
})
export class FornecedorComponent {

  loading:boolean = false;
  @ViewChild('listFornecedor') child?:ListfornecedorComponent;

  constructor(private messageService: MessageService,
              private defaultService: DefaultService) {
  }

  salvarFornecedor(event:any){
    this.defaultService.save(event, 'fornecedor').
    subscribe({
      next: resultado =>{
        this.messageService.add({severity: 'info', summary: 'Sucesso', detail: 'Fornecedor salvo com sucesso'});
      },
      error: error =>{
        this.loading = false;
        this.messageService.add({severity: 'error', summary: 'Erro', detail: error.message});
      },
      complete: () => {
        this.child?.refreshTable();
        this.loading = false;
      }
    });
  }



}
