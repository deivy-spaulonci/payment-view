import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DespesaListComponent} from "./component/despesa/despesa-list/despesa-list.component";
import {HomeComponent} from "./component/home/home.component";

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'despesa-list', component: DespesaListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
