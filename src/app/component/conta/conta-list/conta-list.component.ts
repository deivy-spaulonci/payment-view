import { Component, OnInit } from '@angular/core';
import {Conta} from "../../../model/conta";
import {ConfirmationService, LazyLoadEvent, MenuItem, MessageService} from "primeng/api";
import {Util} from "../../../util/util";
import {Router} from "@angular/router";
import {DefaultService} from "../../../service/default.service";
import {FormBuilder} from "@angular/forms";
import {TipoConta} from "../../../model/tipo-conta";

@Component({
  selector: 'app-conta-list',
  templateUrl: './conta-list.component.html',
  styleUrls: ['./conta-list.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ContaListComponent implements OnInit {
  br: any;
  contaSelecionada!: Conta;
  cols!: any[];
  loading!: boolean;
  totalValor!: number;
  items!: MenuItem[];
  // datasoruce
  tiposConta!: any[];
  contas!: any[];
  // tabela
  pageNumber = 0;
  pageSize = 10;
  totalElements = 0;

  detalharConta:boolean = false;

  util: Util = new Util();

  constructor(private router: Router,
              private defaultService: DefaultService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loading = true;

    this.cols = [
      {field: 'id', header: 'ID', width: '25px'},
      {field: 'tipoConta', header: 'Conta', width: '200px'},
      {field: 'emissao', header: 'Emissão', width: '160px'},
      {field: 'vencimento', header: 'Vencimento', width: '160px'},
      {field: 'parcela', header: 'Parcelas', width: '20px'},
      {field: 'valor', header: 'Valor', width: '40px'},
      {field: 'status', header: 'Status', width: '28px'}
    ];

    this.items = [
      {label: 'Visualizar', icon: 'pi pi-fw pi-search',
        command: () => this.detalharConta = true},
      {label: 'Excluir', icon: 'pi pi-fw pi-times',
        command: () => this.excluirConta()},
      {label: 'Editar', icon: 'pi pi-fw pi-pencil'/*, command: () => /*this.editarDespesa(this.despesaSelecionada)*/}
    ];

    this.defaultService.get('tipo-conta').subscribe(tipos => {
      this.tiposConta = tipos;
      const tipoConta: TipoConta = new TipoConta();
      this.tiposConta.splice(0, 0, tipoConta);
    });
  }

  excluirConta() {
    this.confirmationService.confirm({
      message: 'Deseja realmente excluir essa conta?',
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.defaultService.delete(this.contaSelecionada, 'conta').subscribe(resultado =>{
          this.contas = this.contas.filter(val => val.id !== this.contaSelecionada.id);
          this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Conta excluída'});
        });
      }
    });
  }

  editarConta(conta: Conta){
    // this.router.navigate(['/form-conta', {id: conta.id}]);
  }

  maskaraMoeda($event: KeyboardEvent) {
    // const element = ($event.target as HTMLInputElement);
    // element.value = this.util.formatFloatToReal(element.value);
  }

  loadData(event: LazyLoadEvent) {
    let filtros = event.filters;

    let urlfiltros: string = '';
    if (filtros?.['id']) {
      urlfiltros += '&id=' + filtros?.['id'].value;
    }
    if (filtros?.['tipoConta'] && filtros?.['tipoConta'].value.id) {
      urlfiltros += '&tipoConta.id=' + filtros?.['tipoConta'].value.id;
    }
    if (filtros?.['emissaoInicial'] && filtros?.['emissaoInicial'].value) {
      const emissaoInicial: string = this.util.dataBRtoDataIso(filtros?.['emissaoInicial'].value);
      urlfiltros += '&emissaoInicial=' + emissaoInicial;
    }
    if (filtros?.['emissaoFinal'] && filtros?.['emissaoFinal'].value) {
      const emissaoFinal: string = this.util.dataBRtoDataIso(filtros?.['emissaoFinal'].value);
      urlfiltros += '&emissaoFinal=' + emissaoFinal;
    }

    if (filtros?.['vencimentoInicial'] && filtros?.['vencimentoInicial'].value) {
      const vencimentoInicial: string = this.util.dataBRtoDataIso(filtros?.['vencimentoInicial'].value);
      urlfiltros += '&vencimentoInicial=' + vencimentoInicial;
    }
    if (filtros?.['vencimentoFinal'] && filtros?.['vencimentoFinal'].value) {
      const vencimentoFinal: string = this.util.dataBRtoDataIso(filtros?.['vencimentoFinal'].value);
      urlfiltros += '&vencimentoFinal=' + vencimentoFinal;
    }

    event.rows = (event.rows ? event.rows : this.pageSize);
    event.sortField = (event.sortField ? event.sortField : 'data');
    if (event.first)
      this.pageNumber = (event.first + event.rows) / event.rows -1;
    this.loading = true;

    const url: string = 'conta/page?page=' + this.pageNumber
      + '&size=' + event.rows
      + '&sort=' + event.sortField + ',' + (event.sortOrder == 1 ? 'asc' : 'desc')
      + urlfiltros;

    this.defaultService.get(url).subscribe(resultado => {
      this.contas = resultado.content;
      this.totalElements = resultado.totalElements;

      this.loading = false;
      this.defaultService.get('conta/valorTotal?' + urlfiltros).subscribe(somatotal => {
        this.totalValor = somatotal;
      });
    });
  }
}
