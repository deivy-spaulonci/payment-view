import { Component, OnInit } from '@angular/core';
import {TipoDespesa} from "../../model/tipo-despesa";
import {DefaultService} from "../../service/default.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-tipo-despesa',
  templateUrl: './tipo-despesa.component.html',
  styleUrls: ['./tipo-despesa.component.css'],
  providers: [MessageService]
})
export class TipoDespesaComponent implements OnInit {

  loading!: boolean;
  tiposDespesas!: any[];
  cols!: any[];

  constructor(private defaultService: DefaultService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.cols = [
      {field: 'id', header: 'ID', width: '25px', alg:'center'},
      {field: 'nome', header: 'Despesa', width: '55px', alg:'left'}
    ]

    this.defaultService.get('tipo-despesa').subscribe(tipos => {
      this.tiposDespesas = tipos;
    });
  }

  onRowEditSave(tipoDespesa: TipoDespesa) {
    this.loading = true;
    this.defaultService.update(tipoDespesa, 'tipo-despesa').subscribe(resultado =>{
      this.loading = false;
      this.messageService.add({severity: 'info', summary: 'Sucesso', detail: 'Tipo Despesa salva com sucesso'});
    });
  }

}
