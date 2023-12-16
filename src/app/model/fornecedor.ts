import {Cidade} from "./cidade";

export class Fornecedor {
  id!: number;
  nome!: string;
  razaoSocial!: string;
  cnpj!: string;
  cidade!: Cidade;

}
