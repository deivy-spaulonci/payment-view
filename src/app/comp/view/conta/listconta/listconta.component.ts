import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MenuItem, Message, MessageService} from "primeng/api";
import {DefaultService} from "../../../../sevice/default.service";
import {Conta} from "../../../../model/conta";
import {TableLazyLoadEvent} from "primeng/table";
import {TipoConta} from "../../../../model/tipo-conta";
import {Util} from "../../../../util/util";

@Component({
  selector: 'app-listconta',
  templateUrl: './listconta.component.html',
  styleUrl: './listconta.component.css',
  providers: [MessageService]
})
export class ListcontaComponent implements OnInit {

  tiposConta:TipoConta[] = [];
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
  status!:any[];
  items!: MenuItem[];


  filtros:any={
    tipoConta:TipoConta,
    statusSelected:{},
    vencimentoInicial: String,
    vencimentoFinal: String
  };

  constructor(private messageService: MessageService,
              private defaultService: DefaultService) {

    this.filtros.vencimentoInicial = null;
    this.filtros.vencimentoFinal = null;

    this.status = [
      { nome: 'PAGOS', code: '2' },
      { nome: 'VENCIMENTO HOJE', code: '0' },
      { nome: 'ATRASADO', code: '-1' },
      { nome: 'EM ABERTO', code: '1'}
    ];

    this.items = [
      { label: 'Editar', icon: 'pi pi-fw pi-pencil', command: () => console.log('nao implementado ainda') },
      { label: 'Excluir', icon: 'pi pi-fw pi-trash', command: () => this.excluirConta() }
    ];
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

    this.defaultService.get('tipo-conta').subscribe(tipos => {
      this.tiposConta = tipos;
    });
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

    if(this.filtros.statusSelected && this.filtros.statusSelected.code){
      urlfiltros += '&status=' + this.filtros.statusSelected.code;
    }


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

  limparFiltros(){
    this.filtros.vencimentoInicial = '';
    this.filtros.vencimentoFinal = '';
    this.filtros.tipoConta = null;
    this.filtros.statusSelected = {};

  }

  excluirConta() {
    return undefined;
  }

  onRowSelect($event: any) {
    this.messageService.clear();

    switch (this.contaSelecionada.intStatus) {
      case 2 : this.messageService.add({ severity: 'info', summary: 'Pago', detail: '' }); break;
      case 1 : this.messageService.add({ severity: 'success', summary: 'Em Aberto', detail: '' }); break;
      case 0 : this.messageService.add({ severity: 'warn', summary: 'Vencimento Hoje', detail: '' }); break;
      case -1 : this.messageService.add({ severity: 'error', summary: 'Conta Atrasada', detail: '' }); break;
    }
  }
}
