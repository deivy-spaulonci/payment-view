import { Component, OnInit } from '@angular/core';
import {TipoDespesa} from "../../../model/tipo-despesa";
import {Fornecedor} from "../../../model/fornecedor";
import {FormaPagamento} from "../../../model/forma-pagamento";
import {TipoInformacaoExtra} from "../../../model/tipo-informacao-extra";
import {Despesa} from "../../../model/despesa";
import {InformacaoExtra} from "../../../model/informacao-extra";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Util} from "../../../util/util";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {DefaultService} from "../../../service/default.service";

@Component({
  selector: 'app-despesa-form',
  templateUrl: './despesa-form.component.html',
  styleUrls: ['./despesa-form.component.css'],
  providers: [MessageService]
})
export class DespesaFormComponent implements OnInit {

  loading!: boolean;
  tiposDespesa!: TipoDespesa[];
  fornecedores!: Fornecedor[];
  formasPagamento!: FormaPagamento[];
  tiposInformacaoExtra!: TipoInformacaoExtra[];

  tipoDespesa!: TipoDespesa;
  fornecedor!: Fornecedor;
  formaPagamento!: FormaPagamento;

  despesaCadastro!: Despesa;
  informacaoExtra!: InformacaoExtra;

  despesaform!: FormGroup;

  total!: number;
  util: Util = new Util();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private defaultService: DefaultService,
              private messageService: MessageService,
              private fb: FormBuilder) {

    this.despesaCadastro = new Despesa();
    this.informacaoExtra = new InformacaoExtra();
    this.informacaoExtra.tipoInformacaoExtra = new TipoInformacaoExtra();
}

  ngOnInit(): void {
    this.loading = true;
    this.despesaform = this.fb.group({
      comboTipoDespesa: '',
      autoCompleteFornecedor : '',
      comboFormaPagamento: '',
      inputObservacao: '',
      inputData: new FormControl('', Validators.required),
      inputValor: new FormControl('', Validators.required)
    });

    this.despesaCadastro.id = Number(this.route.snapshot.paramMap.get('id'));

    if(this.despesaCadastro.id){
      this.defaultService.get('despesa/' + this.despesaCadastro.id).subscribe(resultado => {
        this.despesaCadastro = resultado;
        var arrdata = this.despesaCadastro.data.toString().split('-');
        this.despesaform.get('inputData')?.setValue(arrdata[2] + '/' + arrdata[1] + '/' + arrdata[0]);
        this.despesaform.get('inputValor')?.setValue(this.util.formatFloatToReal(this.despesaCadastro.valor.toFixed(2).toString()));
      });
    }

    this.defaultService.get('tipo-despesa').subscribe(resultado => {
      this.tiposDespesa = resultado;
      this.despesaCadastro.tipoDespesa = (this.despesaCadastro.id ? this.despesaCadastro.tipoDespesa : resultado[0]);

      this.defaultService.get('forma-pagamento').subscribe(resultado => {
        this.formasPagamento = resultado;
        this.despesaCadastro.formaPagamento = (this.despesaCadastro.id ? this.despesaCadastro.formaPagamento : resultado[0]);

        this.defaultService.get('fornecedor').subscribe(resultado => {
          this.fornecedores = resultado.content;
          this.despesaCadastro.fornecedor = (this.despesaCadastro.id ? this.despesaCadastro.fornecedor : resultado[0]);

          this.defaultService.get('tipo-informacao-extra').subscribe(resultado => {
            this.tiposInformacaoExtra = resultado;
            this.informacaoExtra.tipoInformacaoExtra = resultado[0];

            this.defaultService.get('despesa/valorTotal').subscribe(resultado => {
              this.total = resultado;

              this.loading = false;
            });

          });
        });
      });
    });
  }

  filterFornecedor(event: any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered : any[] = [];
    let query = event.query;

    this.defaultService.get('fornecedor?nome='+event.query).subscribe(resultado => {
      this.fornecedores = resultado;
    });
    // for(let i = 0; i < this.fornecedores.length; i++) {
    //     let fornec = this.fornecedores[i];
    //     if (fornec.nome.toLowerCase().indexOf(query.toLowerCase()) == 0) {
    //         filtered.push(fornec);
    //     }
    // }

    // this.filteredCountries = filtered;
  }

  addInformacaoExtra(event: any){
    if (this.informacaoExtra.numero){

      if (this.despesaCadastro.informacaoExtra == null){
        this.despesaCadastro.informacaoExtra = [];
      }
      this.despesaCadastro.informacaoExtra.push(Object.assign({}, this.informacaoExtra));
      this.informacaoExtra.numero = '';

    }else{
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Número da Informação Extra Inválido!'});
    }
  }


  onSubmit(value: string) {
    this.loading = true;

    // var arrdata = this.despesaCadastro.data.toString().split('/');
    // this.despesaCadastro.data = new Date(arrdata[2] + '-' + arrdata[1] + '-' + arrdata[0]);
    // this.despesaCadastro.data.setUTCDate(this.despesaCadastro.data.getUTCDate() + 1);

    this.despesaCadastro.data = this.util.dataBRtoDataIso(this.despesaCadastro.data);

    this.despesaCadastro.valor = this.util.formatMoedaToFloat(this.util.formatFloatToReal(this.despesaCadastro.valor.toString()));

    this.defaultService.save(this.despesaCadastro, 'despesa').subscribe(resultado =>{
      this.loading = false;
      this.messageService.add({severity: 'info', summary: 'Sucesso', detail: 'Despesa salva com sucesso'});
      if(this.despesaCadastro.id){
        this.router.navigate(['/despesa-list']);
      }else{
        this.despesaCadastro.valor = 0;
        this.despesaCadastro.informacaoExtra = [];
        this.informacaoExtra = new InformacaoExtra;
      }
    });
  }

  maskaraMoeda($event: KeyboardEvent) {
    const element = ( $event.target as HTMLInputElement);
    element.value = this.util.formatFloatToReal(element.value);
  }

}
