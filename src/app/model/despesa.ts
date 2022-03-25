import {TipoDespesa} from "./tipo-despesa";
import {Fornecedor} from "./fornecedor";
import {FormaPagamento} from "./forma-pagamento";
import {InformacaoExtra} from "./informacao-extra";

export class Despesa {
  id!: number;
  tipoDespesa!: TipoDespesa;
  fornecedor!: Fornecedor;
  data!: Date;
  formaPagamento!: FormaPagamento;
  valor!: number;
  obs!: string;
  informacaoExtra!: InformacaoExtra[];
}
