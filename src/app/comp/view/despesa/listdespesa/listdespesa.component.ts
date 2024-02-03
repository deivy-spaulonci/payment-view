import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {TipoDespesa} from "../../../../model/tipo-despesa";
import {Fornecedor} from "../../../../model/fornecedor";
import {FormaPagamento} from "../../../../model/forma-pagamento";
import {Despesa} from "../../../../model/despesa";
import {Util} from "../../../../util/util";
import {DefaultService} from "../../../../sevice/default.service";
import {Table, TableLazyLoadEvent} from "primeng/table";
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";

@Component({
  selector: 'app-listdespesa',
  templateUrl: './listdespesa.component.html',
  styleUrl: './listdespesa.component.css',
  providers: [MessageService, ConfirmationService]
})
export class ListdespesaComponent implements OnInit {
  @Input() tiposDespesa:TipoDespesa[]= [];
  @Input() fornecedores:Fornecedor[]= [];
  @Input() formasPagamento:FormaPagamento[]= [];
  @ViewChild('dt') table?:Table;
  @Output() saveDespesa: EventEmitter<Despesa> = new EventEmitter();

  despesas:Despesa[] = [];
  despesaSelecionada!:Despesa;
  cols!: any[];
  loading:boolean=false;
  totalValor!: number;
  items!: MenuItem[];
  // tabela
  pageSize = 15;
  totalElements = 0;
  sortField:string='data'
  util: Util = new Util();
  filtroDespesaVisible: boolean=false;
  filtros:any={
    id:null,
    tipoDespesa:TipoDespesa,
    formaPagamento:FormaPagamento,
    fornecedor: Fornecedor,
    periodoInicial: String,
    periodoFinal: String
  };

  filtredFornecedores: Fornecedor[];

  constructor(private defaultService: DefaultService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {
    this.loading=true;
    this.filtredFornecedores = [];
    this.filtros.fornecedor = new Fornecedor();
    this.filtros.fornecedor.nome = '';
    this.filtros.periodoInicial = null;
    this.filtros.periodoFinal = null;
  }

  ngOnInit() {
    this.cols = [
      {field: 'id', header: 'ID', width: '90px'},
      {field: 'tipoDespesa', header: 'Despesa', width: '180px'},
      {field: 'fornecedor', header: 'Fornecedor', width: 'auto'},
      {field: 'data', header: 'Data', width: '120px'},
      {field: 'formaPagamento', header: 'Forma Pagamento', width: '250px'},
      {field: 'valor', header: 'Valor', width: '120px'},
      {field: '', header: 'Editar', width: '100px'}
    ];
    this.items = [
      { label: 'Delete', icon: 'pi pi-fw pi-times', command: () => this.excluirDespesa() }
    ];
  }

  refreshTable(){
    this.table?._filter();
  }

  filtroFornecedores(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.fornecedores as any[]).length; i++) {
      let fornecedor = (this.fornecedores as any[])[i];
      if (fornecedor.nome.toLowerCase().includes(query.toLowerCase())
          || fornecedor.razaoSocial.toLowerCase().includes(query.toLowerCase())
          || (fornecedor.cnpj && fornecedor.cnpj.includes(query.toLowerCase()))) {
        filtered.push(fornecedor);
      }
    }
    this.filtredFornecedores = filtered;
  }
  loadData(event: TableLazyLoadEvent) {

    let urlfiltros: string = '';
    this.loading = true;

    if(this.filtros.id)
      urlfiltros += '&id=' + this.filtros.id;
    if(this.filtros.tipoDespesa && this.filtros.tipoDespesa.value)
      urlfiltros += '&tipoDespesa=' + this.filtros.tipoDespesa.value;
    if(this.filtros.formaPagamento && this.filtros.formaPagamento.value)
      urlfiltros += '&formaPagamento=' + this.filtros.formaPagamento.value;
    if(this.filtros.fornecedor && this.filtros.fornecedor.id)
      urlfiltros += '&fornecedor.id=' + this.filtros.fornecedor.id;
    if(this.filtros.periodoInicial)
      urlfiltros += '&dataInicial=' + this.util.dataBRtoDataIso(this.filtros.periodoInicial);
    if(this.filtros.periodoFinal)
      urlfiltros += '&dataFinal=' + this.util.dataBRtoDataIso(this.filtros.periodoFinal);

    event.rows = (event.rows ? event.rows : this.pageSize);
    event.sortField = (event.sortField ? event.sortField : 'data');

    const url: string = 'despesa/page?page=' + (event.first!/this.pageSize)
      + '&size=' + event.rows
      + '&sort=' + event.sortField + ',' + (event.sortOrder == 1 ? 'asc' : 'desc')
      + urlfiltros;

    this.defaultService.get(url).subscribe(resultado => {
      this.despesas = resultado.content;
      this.totalElements = resultado.totalElements;
      this.loading = false;
    });

    this.defaultService.get('despesa/valorTotal?' + urlfiltros).subscribe(somatotal => {
      this.totalValor = somatotal;
    });
  }

  excluirDespesa(){
    this.confirmationService.confirm({
      message: 'Deseja realmente excluir essa despesa?',
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle text-6xl text-primary-500',
      accept: () => {
        this.defaultService.delete(this.despesaSelecionada, 'despesa')
          .subscribe(resultado =>{
            this.despesas = this.despesas.filter(val => val.id !== this.despesaSelecionada.id);
            this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Despesa excluída'});
          });
      }
    });
  }

  maskaraMoeda($event: KeyboardEvent) {
    const element = ( $event.target as HTMLInputElement);
    element.value = this.util.formatFloatToReal(element.value);
  }

  onRowEditSave(despesa: Despesa) {
    this.loading = true;
    despesa.valor = this.util.formatMoedaToFloat(
      this.util.formatFloatToReal(despesa.valor.toString())
    );
    this.saveDespesa.emit(despesa);
  }

  // maskaraMoedaEditValor($event: KeyboardEvent, despesa:Despesa) {
  //   const element = ( $event.target as HTMLInputElement);
  //   element.value = this.util.formatFloatToReal(element.value);
  //   despesa.valor = this.util.formatMoedaToFloat(this.util.formatFloatToReal(element.value));
  // }
}
