import {Component, OnInit} from '@angular/core';
import {DefaultService} from "../../../../sevice/default.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Fornecedor} from "../../../../model/fornecedor";
import {Util} from "../../../../util/util";
import {Cidade} from "../../../../model/cidade";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-formfornecedor',
  templateUrl: './formfornecedor.component.html',
  styleUrl: './formfornecedor.component.css'
})
export class FormfornecedorComponent implements OnInit{

  util: Util = new Util();
  fornecedorCadastro:Fornecedor=new Fornecedor();
  fornecedorform!: FormGroup;
  loading:boolean=false;
  cidade:Cidade=new Cidade();
  estados!:any[];
  constructor(private defaultService: DefaultService,
              private messageService: MessageService,
              private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.fornecedorform = this.fb.group({
      inputCNPJ : new FormControl('', Validators.required),
      inputNome: new FormControl('', Validators.required),
      inputRazaoSocial: new FormControl('', Validators.required),
      inputCidade: new FormControl('', Validators.required)
    });
    this.fornecedorCadastro.cidade = new Cidade();
    this.defaultService.get('estados').subscribe({
      next: response =>{
        this.estados = response;
      }
    });
  }

  buscaCnpj(event: any){
    this.loading = true;
    const cnpj = this.fornecedorform.controls['inputCNPJ'].value.replace(/[^0-9]+/g, '');
    this.defaultService.get('fornecedor/consultacnpj?cnpj=' + cnpj)
      .subscribe({
        next: resultado => {

          if(resultado && resultado.status!='ERROR'){
            this.fornecedorform.controls['inputNome'].setValue(this.util.capitalize((resultado.fantasia ? resultado.fantasia : resultado.nome)));
            this.fornecedorform.controls['inputRazaoSocial'].setValue(this.util.capitalize(resultado.nome));
            this.fornecedorform.controls['inputCidade'].setValue(this.util.capitalize(resultado.municipio));
            let estado = this.estados.filter(estado => estado.sigla===resultado.uf)[0];

            this.defaultService.get('cidades/' + estado.id)
              .subscribe({
                next: response=>{
                  let cidades = response as Cidade[];
                  cidades = cidades.filter(cidade =>
                      this.util.semAcento(cidade.nome.toLowerCase()) === resultado.municipio.toLowerCase()
                  );
                  this.cidade = cidades[0];
                },
                error: error => {
                  console.log(JSON.stringify(error))
                }
            });
          }else{
            this.messageService.add({severity: 'error', summary: 'Erro', detail: resultado.messge});
          }
        },
        error: error => {
          this.messageService.add({severity: 'error', summary: 'Erro', detail: error.messageerror});
        },
        complete: ()=>{ this.loading = false; }
      });
  }

  onSubmit(value: string) {
    this.loading = true;
    this.fornecedorCadastro.nome = this.fornecedorform.controls['inputNome'].value;
    this.fornecedorCadastro.razaoSocial = this.fornecedorform.controls['inputRazaoSocial'].value;
    this.fornecedorCadastro.cidade = this.fornecedorform.controls['inputCidade'].value;
    this.fornecedorCadastro.cnpj = this.fornecedorform.controls['inputCNPJ'].value.replace(/\D/g, "");
    this.fornecedorCadastro.cidade = this.cidade;
    this.defaultService.save(this.fornecedorCadastro, 'fornecedor')
      .subscribe({
        next: resultado => {
          this.messageService.add({severity: 'info', summary: 'Sucesso', detail: 'Fornecedor salva com sucesso'});
        },
        error: error => {
          this.messageService.add({severity: 'error', summary: 'Erro', detail: error.message});
          this.loading = false;
        },
        complete: () => {
          this.fornecedorform.reset();
          this.fornecedorCadastro = new Fornecedor();
          this.fornecedorCadastro.cidade = new Cidade();

          this.loading = false;
        }
      });
  }
}
