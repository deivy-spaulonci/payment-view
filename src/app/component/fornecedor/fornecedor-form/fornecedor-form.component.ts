import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {Cidade} from "../../../model/cidade";
import {Fornecedor} from "../../../model/fornecedor";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Util} from "../../../util/util";
import {ActivatedRoute, Router} from "@angular/router";
import {DefaultService} from "../../../service/default.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-fornecedor-form',
  templateUrl: './fornecedor-form.component.html',
  styleUrls: ['./fornecedor-form.component.css'],
  providers: [MessageService]
})
export class FornecedorFormComponent implements OnInit {

  loading!: boolean;
  cidades!: Cidade[];
  cidade!: Cidade;

  fornecedorCadastro: Fornecedor;

  forencedorForm!: FormGroup;

  util: Util = new Util();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private defaultService: DefaultService,
              private messageService: MessageService,
              private fb: FormBuilder,
              private http: HttpClient) {
    this.fornecedorCadastro = new Fornecedor();
  }

  ngOnInit(): void {
    this.loading = true;
    this.forencedorForm = this.fb.group({
      inputNome: new FormControl('', Validators.required),
      inputRazao : new FormControl('', Validators.required),
      inputCNPJ: '',
      inputInscEstadual: '',
      inputEndereco: '',
      inputBairro: '',
      inputComplemento: '',
      inputCep: '',
      inputTelefone: '',
      comboCidade: new FormControl('', Validators.required)
    });

    this.defaultService.get('cidade').subscribe(resultado => {
      this.cidades = resultado.content;
      this.loading = false;
    });

    this.fornecedorCadastro.id = Number(this.route.snapshot.paramMap.get('id'));

    if(this.fornecedorCadastro.id){
      this.defaultService.get('fornecedor/' + this.fornecedorCadastro.id).subscribe(resultado => {
        this.fornecedorCadastro = resultado;
      });
    }
  }

  buscaCnpj(event: any){
    this.loading = true;
    const cnpj = this.fornecedorCadastro.cnpj.replace(/[^0-9]+/g, '');
    this.defaultService.get('fornecedor/consultacnpj/?cnpj=' + cnpj).subscribe(resultado => {
      if(resultado){
        this.fornecedorCadastro.nome = this.util.capitalize((resultado.fantasia ? resultado.fantasia : resultado.nome));
        this.fornecedorCadastro.razaoSocial = this.util.capitalize(resultado.nome);
        // this.fornecedorCadastro.inscricaoEstadual =
        this.fornecedorCadastro.endereco = this.util.capitalize(resultado.logradouro) + ' ' + resultado.numero;
        this.fornecedorCadastro.bairro = this.util.capitalize(resultado.bairro);
        this.fornecedorCadastro.complemento = this.util.capitalize(resultado.complemento);
        this.fornecedorCadastro.cep = resultado.cep;
        this.fornecedorCadastro.telefone = resultado.telefone;
        this.fornecedorCadastro.cidade = new Cidade();
        this.forencedorForm.controls['comboCidade'].setValue(this.util.capitalize(resultado.municipio));
        this.defaultService.get('cidade?nome=' + this.util.capitalize(resultado.municipio)).subscribe(retornocidades => {
          this.cidades = retornocidades;
        });
      }else{
        this.messageService.add({severity: 'error', summary: 'Erro', detail: 'CNPJ consultado não retornou vazio!'});
      }
      this.loading = false;
    });

  }

  filterCidade(event: any){
    const filtered: any[] = [];
    const query = event.query;

    this.defaultService.get('cidade?nome=' + event.query).subscribe(resultado => {
      this.cidades = resultado;
    });

  }

  onSubmit(value: string) {
    this.loading = true;

    this.fornecedorCadastro.cnpj = this.fornecedorCadastro.cnpj.replace(/[^0-9]+/g, '');
    this.fornecedorCadastro.cep = this.fornecedorCadastro.cep.replace(/[^0-9]+/g, '');
    this.fornecedorCadastro.telefone = this.fornecedorCadastro.telefone.replace(/[^0-9]+/g, '');

    this.defaultService.save(this.fornecedorCadastro, 'fornecedor').subscribe(resultado => {
      this.loading = false;

      this.messageService.add({severity: 'info', summary: 'Sucesso', detail: 'Fornecedor salvo com sucesso'});
      if (this.fornecedorCadastro.id){
        this.router.navigate(['/list-fornecedor']);
      }else{
        this.fornecedorCadastro = new Fornecedor();
      }

    });
  }

}
