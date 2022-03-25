import {Fornecedor} from "./fornecedor";

export class LancamentoContaCartao {
  id!: number;
  data!: Date;
  fornecedor!: Fornecedor;
  valor!: number;
  parcela!: number;
  totalParcela!: number;
}
