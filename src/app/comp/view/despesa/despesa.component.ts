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

  constructor(private defaultService: DefaultService) {
  }

  loadTable(event:any){
    this.child?.refreshTable();
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
}
