import {Component, Input, OnInit} from '@angular/core';
import {Message, MessageService} from "primeng/api";
import {DefaultService} from "../../../../sevice/default.service";
import {Conta} from "../../../../model/conta";
import {TableLazyLoadEvent} from "primeng/table";
import {FormaPagamento} from "../../../../model/forma-pagamento";
import {TipoConta} from "../../../../model/tipo-conta";
import {TipoDespesa} from "../../../../model/tipo-despesa";
import {Util} from "../../../../util/util";

@Component({
  selector: 'app-listconta',
  templateUrl: './listconta.component.html',
  styleUrl: './listconta.component.css',
  providers: [MessageService]
})
export class ListcontaComponent implements OnInit {
  @Input() tiposConta:TipoConta[]= [];

  success: Message[] | [];
  info: Message[] | [];
  warn: Message[] | [];
  error: Message[] | [];

  contas:Conta[] = [];
  contaSelecionada!:Conta;
  cols!: any[];
  loading:boolean=false;
  totalElements = 0;
  totalValor!: number;
  pageSize = 30;
  sortField:string='vencimento';
  filtroContaVisible: boolean=false;
  util: Util = new Util();
  filtros:any={
    tipoConta:TipoConta,
    formaPagamento:FormaPagamento,
    vencimentoInicial: String,
    vencimentoFinal: String
  };

  constructor(private messageService: MessageService,
              private defaultService: DefaultService) {
    this.success = [{ severity: 'success', summary: 'Em Aberto', detail: '' }];
    this.info = [{ severity: 'info', summary: 'Pago', detail: '' }];
    this.warn = [{ severity: 'warn', summary: 'Vencimento Hoje', detail: '' }];
    this.error = [{ severity: 'error', summary: 'Conta Atrasada', detail: '' }];

    this.filtros.vencimentoInicial = null;
    this.filtros.vencimentoFinal = null;
  }

  ngOnInit(): void {
    this.loading=true;
    this.cols = [
      {field: 'id', header: 'ID', width: '60px'},
      {field: 'tipoConta', header: 'Conta', width: 'auto'},
      {field: 'emissao', header: 'Emissao', width: '120px'},
      {field: 'vencimento', header: 'Vencimento', width: '120px'},
      {field: 'parcela', header: 'Parcelas', width: '100px'},
      {field: 'valor', header: 'Valor', width: '90px'},
      {field: 'status', header: 'Status', width: '70px'},
    ];

  }

  loadData(event: TableLazyLoadEvent) {
    let urlfiltros: string = '';
    this.loading = true;

    if(this.filtros.vencimentoInicial)
      urlfiltros += '&vencimentoInicial=' + this.util.dataBRtoDataIso(this.filtros.vencimentoInicial);
    if(this.filtros.vencimentoFinal)
      urlfiltros += '&vencimentoFinal=' + this.util.dataBRtoDataIso(this.filtros.vencimentoFinal);

    if(this.filtros.tipoConta && this.filtros.tipoConta.id)
      urlfiltros += '&tipoConta=' + this.filtros.tipoConta.id;


    event.rows = (event.rows ? event.rows : this.pageSize);
    event.sortField = (event.sortField ? event.sortField : 'data');

    const url: string = 'conta/page?page=' + (event.first!/this.pageSize)
      + '&size=' + event.rows
      + '&sort=' + event.sortField + ',' + (event.sortOrder == 1 ? 'asc' : 'desc')
      + urlfiltros;

    this.defaultService.get(url).subscribe(resultado => {
      this.contas = resultado.content;
      this.totalElements = resultado.totalElements;
      this.loading=false;
    });

    this.defaultService.get('conta/valorTotal?' + urlfiltros).subscribe(somatotal => {
      this.totalValor = somatotal;
    });
  }

  filtrar(){

  }
  limparFiltros(){
    this.filtros.vencimentoInicial = '';
    this.filtros.vencimentoFinal = '';
    this.filtros.tipoConta = null;
    this.filtros.formaPagamento = null;
  }
}
