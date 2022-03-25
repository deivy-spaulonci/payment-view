import {Component, OnInit} from '@angular/core';
import {Despesa} from "../../../model/despesa";
import {ConfirmationService, LazyLoadEvent, MenuItem, MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {DefaultService} from "../../../service/default.service";
import {TipoDespesa} from "../../../model/tipo-despesa";
import {Fornecedor} from "../../../model/fornecedor";
import {FormaPagamento} from "../../../model/forma-pagamento";
import {Util} from "../../../util/util";

@Component({
  selector: 'app-despesa-list',
  templateUrl: './despesa-list.component.html',
  styleUrls: ['./despesa-list.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class DespesaListComponent implements OnInit {

  despesaSelecionada!: Despesa;
  cols!: any[];
  loading!: boolean;
  totalValor!: number;
  items!: MenuItem[];
  // datasoruce
  tiposDespesas!: any[];
  fornecedores!: any[];
  formasPagamento!: any[];
  despesas!: any[];
  // tabela
  pageNumber = 0;
  pageSize = 15;
  totalElements = 0;
  util: Util = new Util();

  constructor(private router: Router,
              private defaultService: DefaultService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {

  }

  ngOnInit(): void {
    this.loading = true;

    this.cols = [
      {field: 'id', header: 'ID', width: '25px'},
      {field: 'tipoDespesa', header: 'Despesa', width: '55px'},
      {field: 'fornecedor', header: 'Fornecedor', width: '200px'},
      {field: 'data', header: 'Data', width: '80px'},
      {field: 'formaPagamento', header: 'Forma Pagamento', width: '80px'},
      {field: 'valor', header: 'Valor', width: '40px'},
      {field: null, header: 'Editar', width: '28px'},
      {field: null, header: 'Excluir', width: '28px'}
    ];

    this.items = [
      {label: 'Visualizar', icon: 'pi pi-fw pi-search', command: () => console.log('this.selectedProduct')},
      {label: 'Excluir', icon: 'pi pi-fw pi-times', command: () => this.excluirDespesa(this.despesaSelecionada) },
      {label: 'Editar', icon: 'pi pi-fw pi-pencil', command: () => this.editarDespesa(this.despesaSelecionada) }
    ];

    this.defaultService.get('tipo-despesa').subscribe(tipos => {
      this.tiposDespesas = tipos;
      const tipoDespesa: TipoDespesa = new TipoDespesa();
      this.tiposDespesas.splice(0, 0, tipoDespesa);
    });
    this.defaultService.get('fornecedor').subscribe(fornecedores => {
      this.fornecedores = fornecedores;
      const fornecedor: Fornecedor = new Fornecedor();
      this.fornecedores.splice(0, 0, fornecedor);
    });
    this.defaultService.get('forma-pagamento').subscribe(formas => {
      this.formasPagamento = formas;
      const formaPagamento: FormaPagamento = new FormaPagamento();
      this.formasPagamento.splice(0, 0, formaPagamento);
    });
  }

  excluirDespesa(despesa: Despesa) {
    //   this.confirmationService.confirm({
    //     message: 'Deseja realmente excluir essa despesa?',
    //     header: 'Confirmar Exclusão',
    //     icon: 'pi pi-exclamation-triangle',
    //     accept: () => {
    //       this.defaultService.delete(despesa, 'despesa').subscribe(resultado =>{
    //         this.despesas = this.despesas.filter(val => val.id !== despesa.id);
    //         this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Despesa excluída'});
    //       });
    //     }
    //   });
  }


  editarDespesa(despesa: Despesa) {
    //   this.router.navigate(['/form-despesa', {id: despesa.id}]);
    // }
    //
    // maskaraMoeda($event: KeyboardEvent) {
    //   const element = ($event.target as HTMLInputElement);
    //   element.value = this.util.formatFloatToReal(element.value);
  }


  loadData(event: LazyLoadEvent) {

    console.log('>>>> ' +JSON.stringify(event));
    // in a real application, make a remote request to load data using state metadata from event
    // event.first = First row offset
    // event.rows = Number of rows per page
    // event.sortField = Field name to sort with
    // event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    // filters: FilterMetadata object having field as key and filter value, filter matchMode as value

    let urlfiltros: string = '';

    if (event.filters) {
      let filtros = event.filters;
      if (filtros?.['id']) {
        urlfiltros += '&id=' + filtros?.['id'].value;
      }
      if (filtros?.['tipoDespesa'] && filtros?.['tipoDespesa'].value.id) {
        urlfiltros += '&tipoDespesa.id=' + filtros?.['tipoDespesa'].value.id;
      }
      if (filtros?.['fornecedor'] && filtros?.['fornecedor'].value.id) {
        urlfiltros += '&fornecedor.id=' + filtros?.['fornecedor'].value.id;
      }
      if (filtros?.['inicio'] && filtros?.['inicio'].value) {
        const valorDataInicial = this.util.dataBRtoDataIso(filtros?.['inicio'].value);
        urlfiltros += '&dataInicial=' + valorDataInicial;
      }
      if (filtros?.['final'] && filtros?.['final'].value) {
        const valorDataFinal = this.util.dataBRtoDataIso(filtros?.['final'].value);
        urlfiltros += '&dataFinal=' + valorDataFinal;
      }
      if (filtros?.['formaPagamento'] && filtros?.['formaPagamento'].value.id) {
        urlfiltros += '&formaPagamento.id=' + filtros?.['formaPagamento'].value.id;
      }
    }

    event.rows = (event.rows ? event.rows : this.pageSize);
    event.sortField = (event.sortField ? event.sortField : 'data');
    if (event.first)
      this.pageNumber = (event.first + event.rows) / event.rows - 1;
    this.loading = true;

    const url: string = 'despesa/page?page=' + this.pageNumber
      + '&size=' + event.rows
      + '&sort=' + event.sortField + ',' + (event.sortOrder == 1 ? 'asc' : 'desc')
      + urlfiltros;

    this.defaultService.get(url).subscribe(resultado => {
      this.despesas = resultado.content;
      this.totalElements = resultado.totalElements;

      this.loading = false;
      this.defaultService.get('despesa/valorTotal?' + urlfiltros).subscribe(somatotal => {
        this.totalValor = somatotal;
      });
      this.messageService.add({severity: 'info', summary: 'Success', detail: 'Despesas carregadas'});
    });
  }

}
