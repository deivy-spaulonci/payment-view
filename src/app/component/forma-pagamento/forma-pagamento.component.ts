import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {DefaultService} from "../../service/default.service";
import {TipoDespesa} from "../../model/tipo-despesa";
import {FormaPagamento} from "../../model/forma-pagamento";

@Component({
  selector: 'app-forma-pagamento',
  templateUrl: './forma-pagamento.component.html',
  styleUrls: ['./forma-pagamento.component.css'],
  providers: [MessageService]
})
export class FormaPagamentoComponent implements OnInit {

  loading!: boolean;
  formasPagamento!: any[];
  cols!: any[];

  constructor(private defaultService: DefaultService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.cols = [
      {field: 'id', header: 'ID', width: '25px', alg:'center'},
      {field: 'nome', header: 'Despesa', width: '55px', alg:'left'}
    ]

    this.defaultService.get('forma-pagamento').subscribe(tipos => {
      this.formasPagamento = tipos;
    });
  }

  onRowEditSave(formaPagametno: FormaPagamento) {
    this.loading = true;
    this.defaultService.update(formaPagametno, 'forma-pagamento').subscribe(resultado =>{
      this.loading = false;
      this.messageService.add({severity: 'info', summary: 'Sucesso', detail: 'Forma Pagamento salva com sucesso'});
    });
  }
}
