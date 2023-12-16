import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './comp/view/dashboard/dashboard.component';
import {FornecedorComponent} from './comp/view/fornecedor/fornecedor.component';
import {ListfornecedorComponent} from './comp/view/fornecedor/listfornecedor/listfornecedor.component';
import {FormfornecedorComponent} from "./comp/view/fornecedor/formfornecedor/formfornecedor.component";
import {DespesaComponent} from './comp/view/despesa/despesa.component';
import {FormdespesaComponent} from './comp/view/despesa/formdespesa/formdespesa.component';
import {ListdespesaComponent} from './comp/view/despesa/listdespesa/listdespesa.component';
import {LoadingComponent} from './comp/loading/loading.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CnpjPipe} from "./pipe/cnpj.pipe";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from 'primeng/button';
import {MenubarModule} from 'primeng/menubar';
import {MenuModule} from 'primeng/menu';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {MessagesModule} from 'primeng/messages';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {DialogModule} from 'primeng/dialog';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {InputMaskModule} from 'primeng/inputmask';
import {InputTextModule} from 'primeng/inputtext';
import {PanelModule} from 'primeng/panel';
import {ProgressBarModule} from 'primeng/progressbar';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ToolbarModule} from 'primeng/toolbar';
import { SidebarModule } from 'primeng/sidebar';
import {registerLocaleData} from "@angular/common";

import localept from '@angular/common/locales/pt';
import {MessageModule} from "primeng/message";

registerLocaleData(localept, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FornecedorComponent,
    ListfornecedorComponent,
    CnpjPipe,
    FormfornecedorComponent,
    LoadingComponent,
    DespesaComponent,
    FormdespesaComponent,
    ListdespesaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    MenubarModule,
    MenuModule,
    ToastModule,
    TableModule,
    DropdownModule,
    MessagesModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    DialogModule,
    AutoCompleteModule,
    InputMaskModule,
    InputTextModule,
    PanelModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    ToolbarModule,
    SidebarModule,
    MessageModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
