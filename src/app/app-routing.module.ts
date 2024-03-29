import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./comp/view/dashboard/dashboard.component";
import {FornecedorComponent} from "./comp/view/fornecedor/fornecedor.component";
import {DespesaComponent} from "./comp/view/despesa/despesa.component";
import {ListcontaComponent} from "./comp/view/conta/listconta/listconta.component";
import {FormcontaComponent} from "./comp/view/conta/formconta/formconta.component";

const routes: Routes = [
  {path:"", component: DashboardComponent, pathMatch: "full"},
  {path:"fornecedor", component: FornecedorComponent},
  {path:"despesa", component: DespesaComponent},
  {path:"formConta", component: FormcontaComponent},
  {path:"listConta", component: ListcontaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
