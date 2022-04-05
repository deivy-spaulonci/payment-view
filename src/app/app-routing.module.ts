import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DespesaListComponent} from "./component/despesa/despesa-list/despesa-list.component";
import {HomeComponent} from "./component/home/home.component";
import {DespesaFormComponent} from "./component/despesa/despesa-form/despesa-form.component";
import {FornecedorListComponent} from "./component/fornecedor/fornecedor-list/fornecedor-list.component";
import {FornecedorFormComponent} from "./component/fornecedor/fornecedor-form/fornecedor-form.component";
import {TipoDespesaComponent} from "./component/tipo-despesa/tipo-despesa.component";
import {FormaPagamentoComponent} from "./component/forma-pagamento/forma-pagamento.component";
import {ContaFormComponent} from "./component/conta/conta-form/conta-form.component";
import {ContaListComponent} from "./component/conta/conta-list/conta-list.component";

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'despesa-list', component: DespesaListComponent},
  { path: 'despesa-form', component: DespesaFormComponent},
  { path: 'fornecedor-list', component: FornecedorListComponent},
  { path: 'fornecedor-form', component: FornecedorFormComponent},
  { path: 'tipo-despesa', component: TipoDespesaComponent},
  { path: 'forma-pagamento', component: FormaPagamentoComponent},
  { path: 'conta-form', component: ContaFormComponent},
  { path: 'conta-list', component: ContaListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
