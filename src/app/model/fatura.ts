import {Fornecedor} from "./fornecedor";

export class Fatura {
  id!: number;
  parcela!: number;
  totalParcelas!: number;
  data!:  String;
  valor!: number;
  fornecedor!: Fornecedor;
}
