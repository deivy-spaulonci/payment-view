import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {DefaultService} from "../../../../sevice/default.service";
import {Table, TableLazyLoadEvent} from "primeng/table";
import {Fornecedor} from "../../../../model/fornecedor";
import {Despesa} from "../../../../model/despesa";

@Component({
  selector: 'app-listfornecedor',
  templateUrl: './listfornecedor.component.html',
  styleUrl: './listfornecedor.component.css'
})
export class ListfornecedorComponent implements OnInit{

  fornecedorSelecionado!: Fornecedor;
  cols!: any[];
  fornecedores!: any[];
  cidadesFiltro!: any[];
  loading:boolean=false;
  // tabela
  pageNumber = 0;
  pageSize = 15;
  totalElements = 0;
  @ViewChild('dt') table?:Table;
  @Output() saveFornecedor: EventEmitter<Fornecedor> = new EventEmitter();

  constructor(private defaultService: DefaultService) {
  }

  ngOnInit() {
    this.cols = [
      {field: 'id', header: 'ID', width: '90px'},
      {field: 'nome', header: 'Nome', width: 'auto'},
      {field: 'cnpj', header: 'CNPJ', width: '170px'},
      {field: 'cidade', header: 'Cidade', width: '250px'},
      {field: null, header: 'Editar', width: '100px'}
    ];
  }

  loadData(event: TableLazyLoadEvent) {
    let urlfiltros: string = '';
    this.loading = true;

    if (event.filters) {
      let filtros: any = event.filters;

      if (filtros.id && filtros.id[0].value) {
        urlfiltros += '&id=' + filtros.id[0].value;
      }
      if (filtros.nome && filtros.nome[0].value) {
        urlfiltros += '&nome=' + filtros.nome[0].value;
      }
      if (filtros.cnpj && filtros.cnpj[0].value) {
        urlfiltros += '&cnpj=' + filtros.cnpj[0].value;
      }
      if (filtros.cidade && filtros.cidade[0].value) {
        urlfiltros += '&cidade.nome=' + filtros.cidade[0].value;
      }
    }

    event.rows = (event.rows ? event.rows : this.pageSize);
    event.sortField = (event.sortField ? event.sortField : 'nome');

    this.pageNumber = (event.first==0 ? 0 : (event.first! / event.rows));

    this.loading = true;

    const url: string = 'fornecedor/page?page=' + this.pageNumber
      + '&size=' + event.rows
      + '&sort=' + event.sortField + ',' + (event.sortOrder == 1 ? 'asc' : 'desc')
      + urlfiltros;

    this.defaultService.get(url).subscribe(resultado => {
      this.fornecedores = resultado.content;
      this.totalElements = resultado.totalElements;
      this.loading = false;
    });
  }

  onRowEditSave(fornecedor: Fornecedor) {
    this.saveFornecedor.emit(fornecedor);
  }

  refreshTable(){
    this.table?._filter();
  }
}
