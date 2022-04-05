import {Component, OnInit} from '@angular/core';
import {TipoConta} from "../../../model/tipo-conta";
import {FormaPagamento} from "../../../model/forma-pagamento";
import {Fornecedor} from "../../../model/fornecedor";
import {Conta} from "../../../model/conta";
import {LancamentoContaCartao} from "../../../model/lancamento-conta-cartao";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Util} from "../../../util/util";
import {ActivatedRoute, Router} from "@angular/router";
import {DefaultService} from "../../../service/default.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-conta-form',
  templateUrl: './conta-form.component.html',
  styleUrls: ['./conta-form.component.css'],
  providers: [MessageService]
})
export class ContaFormComponent implements OnInit {

  loading!: boolean;
  tiposConta!: TipoConta[];
  formasPagamento!: FormaPagamento[];
  fornecedores!: Fornecedor[];

  contaCadastro!: Conta;
  lancamentoContaCartaoCadastro!: LancamentoContaCartao;

  contaForm!: FormGroup;
  util: Util = new Util();
  total: number = 0;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private defaultService: DefaultService,
              private messageService: MessageService,
              private fb: FormBuilder) {
    this.contaCadastro = new Conta();
    this.contaCadastro.tipoConta = new TipoConta();
    this.contaCadastro.formaPagamento = new FormaPagamento();
    this.lancamentoContaCartaoCadastro = new LancamentoContaCartao();
    this.contaCadastro.parcela = 0;
    this.contaCadastro.totalParcela = 0;
  }

  ngOnInit(): void {
    this.loading = true;
    this.contaForm = this.fb.group({
      inputNumero: new FormControl('', Validators.required),
      inputCodigoBarra: '',
      comboTipoConta: new FormControl('', Validators.required),
        inputEmissao: new FormControl('', Validators.required),
        inputVencimento: new FormControl('', Validators.required),
        inputParcela: '',
        inputTotalParcela: '',
        inputValor: new FormControl('', Validators.required),
        inputObservacao: '',
      //   inputDataPagamento: '',
      //   comboFormaPagamento: '',
      //   inputValorPago: ''
    });
    //
    // this.contaCadastro.id = Number(this.route.snapshot.paramMap.get('id'));
    // if (this.contaCadastro.id) {
    //   this.defaultService.get('conta/' + this.contaCadastro.id).subscribe(resultado => {
    //     this.contaCadastro = resultado;
    //     const arremissao = this.contaCadastro.emissao.toString().split('-');
    //     const arrdvencimento = this.contaCadastro.vencimento.toString().split('-');
    //
    //     this.contaForm.get('inputEmissao').setValue(arremissao[2] + '/' + arremissao[1] + '/' + arremissao[0]);
    //     this.contaForm.get('inputVencimento').setValue(arrdvencimento[2] + '/' + arrdvencimento[1] + '/' + arrdvencimento[0]);
    //
    //     this.contaForm.get('inputValor').setValue(this.util.formatFloatToReal(this.contaCadastro.valor.toFixed(2).toString()));
    //
    //     if(this.contaCadastro.dataPagamento){
    //       const arrddatapagamento = this.contaCadastro.dataPagamento.toString().split('-');
    //       this.contaForm.get('inputDataPagamento').setValue(arrddatapagamento[2] + '/' + arrddatapagamento[1] + '/' + arrddatapagamento[0]);
    //     }
    //     if(this.contaCadastro.valorPago){
    //       this.contaForm.get('inputValorPago').setValue(this.util.formatFloatToReal(this.contaCadastro.valorPago.toFixed(2).toString()));
    //     }
    //   });
    //
    // }

    this.defaultService.get('tipo-conta').subscribe(retornoTipoConta => {
      this.tiposConta = retornoTipoConta;
      this.contaCadastro.tipoConta = (this.contaCadastro.id ?
        this.contaCadastro.tipoConta :
        retornoTipoConta[0]
      );

      this.defaultService.get('forma-pagamento').subscribe(retornoFormaPagamento => {
        this.formasPagamento = retornoFormaPagamento;

        this.contaCadastro.formaPagamento = (this.contaCadastro.id ?
          this.contaCadastro.formaPagamento :
          new FormaPagamento()
        );

        this.defaultService.get('fornecedor').subscribe(retornoFornecedor => {
          this.fornecedores = retornoFornecedor;

          this.defaultService.get('conta/total').subscribe(retornoTotal => {
            this.total = retornoTotal;
            this.loading = false;
          });
        });

      });
    });
  }

  maskaraMoeda($event: KeyboardEvent) {
    const element = ($event.target as HTMLInputElement);
    element.value = this.util.formatFloatToReal(element.value);
  }

  // mascaraNumero($event: KeyboardEvent) {
  //   const element = ($event.target as HTMLInputElement);
  //   element.value = this.util.formatOnlyNumber(element.value);
  // }
  //
  onSubmit(value: string) {
    //   this.loading = true;
    //
    //   const arremissao = this.contaCadastro.emissao.toString().split('/');
    //   this.contaCadastro.emissao = new Date(arremissao[2] + '-' + arremissao[1] + '-' + arremissao[0]);
    //   this.contaCadastro.emissao.setUTCDate(this.contaCadastro.emissao.getUTCDate() + 1);
    //
    //   const arrvencimento = this.contaCadastro.vencimento.toString().split('/');
    //   this.contaCadastro.vencimento = new Date(arrvencimento[2] + '-' + arrvencimento[1] + '-' + arrvencimento[0]);
    //   this.contaCadastro.vencimento.setUTCDate(this.contaCadastro.vencimento.getUTCDate() + 1);
    //
    //   this.contaCadastro.valor = this.util.formatMoedaToFloat(this.util.formatFloatToReal(this.contaCadastro.valor.toString()));
    //
    //   this.contaCadastro.parcela = (this.contaCadastro.parcela ? 0 : this.contaCadastro.parcela);
    //
    //   if (!this.contaCadastro.dataPagamento || !this.contaCadastro.valorPago || !this.contaCadastro.formaPagamento) {
    //     this.contaCadastro.formaPagamento = null;
    //     this.contaCadastro.dataPagamento = null;
    //     this.contaCadastro.valorPago = null;
    //   } else {
    //     const arrdatapagamento = this.contaCadastro.dataPagamento.toString().split('/');
    //     this.contaCadastro.dataPagamento = new Date(arrdatapagamento[2] + '-' + arrdatapagamento[1] + '-' + arrdatapagamento[0]);
    //     this.contaCadastro.dataPagamento.setUTCDate(this.contaCadastro.dataPagamento.getUTCDate() + 1);
    //
    //     this.contaCadastro.valorPago = this.util.formatMoedaToFloat(this.util.formatFloatToReal(this.contaCadastro.valorPago.toString()));
    //   }
    //
    //   if (this.contaCadastro.emissao > this.contaCadastro.vencimento) {
    //     this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Emissão maior que o vencimento!'});
    //   } else if (this.contaCadastro.parcela > this.contaCadastro.totalParcela) {
    //     this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Parcela esta maior que seu total!'});
    //   } else {
    //     this.defaultService.save(this.contaCadastro, 'conta').subscribe(resultado => {
    //       this.messageService.add({severity: 'info', summary: 'Sucesso', detail: 'Conta salva com sucesso'});
    //       if (this.contaCadastro.id) {
    //         this.router.navigate(['/list-conta']);
    //       } else {
    //         this.contaCadastro = new Conta();
    //         this.contaCadastro.tipoConta = new TipoConta();
    //       }
    //     });
    //   }
    //   this.loading = false;
  }

  //
  // addLancamentoContaCartao(event: any): void {
  //   if (!this.lancamentoContaCartaoCadastro.data) {
  //     this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Data do Lançamento Extra Inválido!'});
  //   } else if (!this.lancamentoContaCartaoCadastro.fornecedor) {
  //     this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Fornecedor do Lançamento Extra Inválido!'});
  //   } else if (!this.lancamentoContaCartaoCadastro.valor) {
  //     this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Valor do Lançamento Extra Inválido!'});
  //   } else {
  //     if (this.contaCadastro.lancamentoContaCartao == null) {
  //       this.contaCadastro.lancamentoContaCartao = [];
  //     }
  //     const arrdata = this.lancamentoContaCartaoCadastro.data.toString().split('/');
  //     this.lancamentoContaCartaoCadastro.data = new Date(arrdata[2] + '-' + arrdata[1] + '-' + arrdata[0]);
  //     this.lancamentoContaCartaoCadastro.data.setUTCDate(this.lancamentoContaCartaoCadastro.data.getUTCDate() + 1);
  //
  //     this.lancamentoContaCartaoCadastro.valor = this.util.formatMoedaToFloat(this.util.formatFloatToReal(this.lancamentoContaCartaoCadastro.valor.toString()));
  //
  //     this.contaCadastro.lancamentoContaCartao.push(Object.assign({}, this.lancamentoContaCartaoCadastro));
  //     this.lancamentoContaCartaoCadastro.valor = 0;
  //   }
  // }

}
