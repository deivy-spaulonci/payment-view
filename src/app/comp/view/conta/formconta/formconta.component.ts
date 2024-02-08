import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DefaultService} from "../../../../sevice/default.service";
import {MessageService} from "primeng/api";
import {TipoConta} from "../../../../model/tipo-conta";
import {Conta} from "../../../../model/conta";
import {FormaPagamento} from "../../../../model/forma-pagamento";
import {Fornecedor} from "../../../../model/fornecedor";
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";
import {Fatura} from "../../../../model/fatura";
import {Util} from "../../../../util/util";

@Component({
  selector: 'app-formconta',
  templateUrl: './formconta.component.html',
  styleUrl: './formconta.component.css',
  providers: [MessageService]
})
export class FormcontaComponent implements OnInit{
  @Input() tiposConta:TipoConta[]= [];

  contaform!: FormGroup;
  contaCadastro:Conta = new Conta();
  formasPagamento:FormaPagamento[]=[];
  fornecedores:Fornecedor[]=[];
  filtredFornecedores: Fornecedor[];
  fatura:Fatura = new Fatura();
  util: Util = new Util();

  constructor(private defaultService: DefaultService,
              private messageService: MessageService,
              private fb: FormBuilder) {
    this.filtredFornecedores = [];

  }

  ngOnInit(): void {
    this.contaform = this.fb.group({
      comboTipoConta: new FormControl('', Validators.required),
      inputEmissao: new FormControl('', Validators.required),
      inputVencimento: new FormControl('', Validators.required),
      inputValor: new FormControl('', Validators.required),
      inputCodigoBarra: new FormControl('', Validators.required),
      inputObservacao: new FormControl(),
    });

    this.defaultService.get('forma-pagamento').subscribe(formas => {
      this.formasPagamento = formas;
      this.defaultService.get('fornecedor').subscribe(fornecedores => {
        this.fornecedores = fornecedores;
        // this.loading = false;
      });
    });
  }

  checkEdicao(conta:Conta){
    this.contaCadastro = conta;
    this.contaform.controls['inputCodigoBarra'].setValue(this.contaCadastro.codigoBarra);
    this.contaform.controls['comboTipoConta'].setValue(this.contaCadastro.tipoConta);
    this.contaform.controls['inputEmissao'].setValue(
      this.util.dateToDataBR(this.contaCadastro.emissao)
    );
    this.contaform.controls['inputVencimento'].setValue(
      this.util.dateToDataBR(this.contaCadastro.vencimento)
    );
    this.contaform.controls['inputValor'].setValue(
      this.util.formatFloatToReal(this.contaCadastro.valor.toString())
    );

  }

  filtroFornecedores(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.fornecedores as any[]).length; i++) {
      let fornecedor = (this.fornecedores as any[])[i];
      if (fornecedor.nome.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(fornecedor);
      }
    }
    this.filtredFornecedores = filtered;
  }

  async onSubmit(value: string) {
    // this.loading = true;
    this.contaCadastro.codigoBarra = this.contaform.controls['inputCodigoBarra'].value;
    //
    this.contaCadastro.emissao = this.util.dataBRtoDataIso(this.contaform.controls['inputEmissao'].value);
    this.contaCadastro.vencimento = this.util.dataBRtoDataIso(this.contaform.controls['inputVencimento'].value);
    this.contaCadastro.valor = this.util.formatMoedaToFloat(
      this.util.formatFloatToReal(this.contaform.controls['inputValor'].value)
    );

    this.contaCadastro.obs = this.contaform.controls['inputObservacao'].value;

    alert(JSON.stringify(this.contaCadastro));

    await this.saveConta(this.contaCadastro);
    // this.despesaform.controls['inputValor'].setValue( 0);
  }

  maskaraMoeda($event: KeyboardEvent) {
    const element = ( $event.target as HTMLInputElement);
    element.value = this.util.formatFloatToReal(element.value);
  }

  addFatura() {

    let faturaaux = new Fatura();
    Object.assign(faturaaux, this.fatura);
    faturaaux.data = this.util.dataBRtoDataIso(faturaaux.data);
    faturaaux.valor = this.util.formatMoedaToFloat(
      this.util.formatFloatToReal(faturaaux.valor+"")
    );
    if(!this.contaCadastro.faturas)
      this.contaCadastro.faturas = [];

    this.contaCadastro.faturas.push(faturaaux);

    this.fatura.valor = 0;
    this.fatura.parcela = 0;
    this.fatura.totalParcelas = 0;
  }

  private async saveConta(contaCadastro: Conta) {

      this.defaultService.save(contaCadastro, 'conta').
      subscribe({
        next: resultado =>{
          this.messageService.add({severity: 'info', summary: 'Sucesso', detail: 'Conta salva com sucesso'});
        },
        error: error =>{
    //    this.loading = false;
          this.messageService.add({severity: 'error', summary: 'Erro', detail: error.message});
        },
        complete: () => {
    //    this.child?.refreshTable();
    //    this.loading = false;
        }
      });

  }
}
