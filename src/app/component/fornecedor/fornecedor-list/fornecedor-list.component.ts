import { Component, OnInit } from '@angular/core';
import {Fornecedor} from "../../../model/fornecedor";
import {ConfirmationService, LazyLoadEvent, MenuItem, MessageService} from "primeng/api";
import {Util} from "../../../util/util";
import {Router} from "@angular/router";
import {DefaultService} from "../../../service/default.service";

@Component({
  selector: 'app-fornecedor-list',
  templateUrl: './fornecedor-list.component.html',
  styleUrls: ['./fornecedor-list.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class FornecedorListComponent implements OnInit {

  br: any;
  fornecedorSelecionado!: Fornecedor;
  cols!: any[];
  loading!: boolean;
  items!: MenuItem[];
  // datasoruce
  fornecedores!: any[];
  cidades!: any[];

  // tabela
  pageNumber = 0;
  pageSize = 10;
  totalElements = 0;

  util: Util = new Util();

  // @ViewChild('dt') table: Table;

  constructor(private router: Router,
              private defaultService: DefaultService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.loading = true;

    this.cols = [
      {field: null, header: '', width: '40px'},
      {field: 'id', header: 'ID', width: '90px'},
      {field: 'nome', header: 'Nome', width: 'auto'},
      {field: 'cnpj', header: 'CNPJ', width: '170px'},
      {field: 'cidade', header: 'Cidade', width: '200px'},
      {field: null, header: 'Editar', width: '80px'}
    ];

    this.items = [
      {label: 'Visualizar', icon: 'pi pi-fw pi-search', command: () => console.log('this.selectedProduct')},
      {label: 'Editar', icon: 'pi pi-fw pi-pencil', command: () => console.log('this.selectedProduct') /*this.editarFornecedor(null)*/}
    ];

    this.defaultService.get('cidade').subscribe(resultado => {
      this.cidades = resultado.content;
    });
  }

  editarFornecedor(forncedor: Fornecedor) {
    //   this.router.navigate(['/form-despesa', {id: despesa.id}]);
  }

  loadData(event: LazyLoadEvent) {
    let filtros = event.filters;

    console.log(JSON.stringify(filtros));

    let urlfiltros: string = '';
    if (filtros?.['id']) {
      urlfiltros += '&id=' + filtros?.['id'].value;
    }
    if (filtros?.['nome']) {
      urlfiltros += '&nome=' + filtros?.['nome'].value;
    }
    if (filtros?.['cnpj']) {
      urlfiltros += '&cnpj=' + filtros?.['cnpj'].value;
    }
    if (filtros?.['cidade']) {
      urlfiltros += '&cidade.nome=' + filtros?.['cidade'].value;
    }

    event.rows = (event.rows ? event.rows : this.pageSize);
    event.sortField = (event.sortField ? event.sortField : 'nome');
    if(event.first)
      this.pageNumber = (event.first + event.rows) / event.rows - 1;
    this.loading = true;


    const url: string = 'fornecedor/page?page=' + this.pageNumber
      + '&size=' + event.rows
      + '&sort=' + event.sortField + ',' + (event.sortOrder == 1 ? 'asc' : 'desc')
      + urlfiltros;

    console.log(url);

    this.defaultService.get(url).subscribe(resultado => {
      this.fornecedores = resultado.content;
      this.totalElements = resultado.totalElements;

      this.loading = false;
      this.messageService.add({severity: 'info', summary: 'Success', detail: 'Fornecedoes carregados'});
    });
  }

}
