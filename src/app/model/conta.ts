import {TipoConta} from "./tipo-conta";
import {FormaPagamento} from "./forma-pagamento";
import {LancamentoContaCartao} from "./lancamento-conta-cartao";
import {Fatura} from "./fatura";

export class Conta {
  id!: number;
  numero!: string;
  codigoBarra!: string;
  tipoConta!: TipoConta;
  emissao!: String;
  vencimento!:  String;
  parcela!: number;
  totalParcelas!: number;
  valor!: number;
  dataPagamento?: String;
  formaPagamento?: FormaPagamento;
  valorPago?: number;
  cancelado!: boolean;
  idCancelamento!: number;
  obs!: string;
  lancamentoContaCartao!: LancamentoContaCartao[];
  status!: string;
  intStatus!: number;
  faturas!: Fatura[];
}
