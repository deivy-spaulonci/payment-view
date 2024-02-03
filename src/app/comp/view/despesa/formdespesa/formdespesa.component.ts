import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {DefaultService} from "../../../../sevice/default.service";
import {Util} from "../../../../util/util";
import {Despesa} from "../../../../model/despesa";
import {TipoDespesa} from "../../../../model/tipo-despesa";
import {Fornecedor} from "../../../../model/fornecedor";
import {FormaPagamento} from "../../../../model/forma-pagamento";
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";

@Component({
  selector: 'app-formdespesa',
  templateUrl: './formdespesa.component.html',
  styleUrl: './formdespesa.component.css'
})
export class FormdespesaComponent  implements OnInit{

  @Input() tiposDespesa:TipoDespesa[]= [];
  @Input() fornecedores:Fornecedor[]= [];
  @Input() formasPagamento:FormaPagamento[]= [];
  // @Output() refreshTable: EventEmitter<void> = new EventEmitter();
  @Output() saveDespesa: EventEmitter<Despesa> = new EventEmitter();
  //
  loading:boolean=false;
  util: Util = new Util();
  despesaCadastro:Despesa=new Despesa();
  despesaform!: FormGroup;

  filtredFornecedores: Fornecedor[];

  constructor(private defaultService: DefaultService,
              private messageService: MessageService,
              private fb: FormBuilder) {
    this.filtredFornecedores = [];
  }

  ngOnInit(): void {
    this.loading = true;
    this.despesaform = this.fb.group({
      comboTipoDespesa: new FormControl('', Validators.required),
      autoCompleteFornecedor : new FormControl('', Validators.required),
      comboFormaPagamento: new FormControl('', Validators.required),
      inputObservacao: new FormControl(),
      inputData: new FormControl('', Validators.required),
      inputValor: new FormControl('', Validators.required),
      inputValorPgto: new FormControl()
    });
    this.despesaCadastro.tipoDespesa = this.despesaform.controls['comboTipoDespesa'].value;
    this.despesaCadastro.formaPagamento = this.despesaform.controls['comboFormaPagamento'].value;
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
    this.loading = true;
    this.despesaCadastro.fornecedor = this.despesaform.controls['autoCompleteFornecedor'].value;

    this.despesaCadastro.data = this.util.dataBRtoDataIso(this.despesaform.controls['inputData'].value);
    this.despesaCadastro.valor = this.util.formatMoedaToFloat(
      this.util.formatFloatToReal(this.despesaform.controls['inputValor'].value)
    );

    this.despesaCadastro.obs = this.despesaform.controls['inputObservacao'].value;

    await this.saveDespesa.emit(this.despesaCadastro);
    this.despesaform.controls['inputValor'].setValue( 0);
  }

  maskaraMoeda($event: KeyboardEvent) {
    const element = ( $event.target as HTMLInputElement);
    element.value = this.util.formatFloatToReal(element.value);
  }

}
