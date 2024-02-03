import {Component, OnInit} from '@angular/core';
import {TipoDespesa} from "../../../model/tipo-despesa";
import {FormaPagamento} from "../../../model/forma-pagamento";
import {TipoConta} from "../../../model/tipo-conta";
import {DefaultService} from "../../../sevice/default.service";

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrl: './conta.component.css'
})
export class ContaComponent implements OnInit{
  tiposConta:TipoConta[] = [];
  formasPagamento:FormaPagamento[]=[];

  constructor(private defaultService: DefaultService) {

  }
  ngOnInit(): void {
    this.defaultService.get('tipo-conta').subscribe(tipos => {
      this.tiposConta = tipos;
        this.defaultService.get('forma-pagamento').subscribe(formas => {
          this.formasPagamento = formas;
        });
    });
  }
}
