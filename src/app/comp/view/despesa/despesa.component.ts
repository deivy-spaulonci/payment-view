import {Component, OnInit, ViewChild} from '@angular/core';
import {MessageService} from "primeng/api";
import {DefaultService} from "../../../sevice/default.service";
import {TipoDespesa} from "../../../model/tipo-despesa";
import {FormaPagamento} from "../../../model/forma-pagamento";
import {Fornecedor} from "../../../model/fornecedor";
import {ListdespesaComponent} from "./listdespesa/listdespesa.component";

@Component({
  selector: 'app-despesa',
  templateUrl: './despesa.component.html',
  styleUrl: './despesa.component.css',
  providers: [MessageService]
})
export class DespesaComponent implements OnInit{

  tiposDespesa:TipoDespesa[] = [];
  formasPagamento:FormaPagamento[]=[];
  fornecedores:Fornecedor[]=[];
  loading:boolean = false;
  @ViewChild('listDespesa') child?:ListdespesaComponent;

  constructor(private messageService: MessageService,
              private defaultService: DefaultService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.defaultService.get('tipo-despesa').subscribe(tipos => {
      this.tiposDespesa = tipos;
      this.defaultService.get('fornecedor').subscribe(fornecedores => {
        this.fornecedores = fornecedores;
        this.defaultService.get('forma-pagamento').subscribe(formas => {
          this.formasPagamento = formas;
          this.loading = false;
        });
      });
    });
  }

  salvarDespesa(event:any){
    this.defaultService.save(event, 'despesa').
    subscribe({
      next: resultado =>{
        this.messageService.add({severity: 'info', summary: 'Sucesso', detail: 'Despesa salva com sucesso'});
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
