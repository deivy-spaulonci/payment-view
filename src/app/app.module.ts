import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DespesaListComponent} from './component/despesa/despesa-list/despesa-list.component';
import {HomeComponent} from './component/home/home.component';

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {InputTextModule} from 'primeng/inputtext';
import {MenubarModule} from 'primeng/menubar';
import {MegaMenuModule} from 'primeng/megamenu';
import {MenuModule} from 'primeng/menu';
import {PanelModule} from 'primeng/panel';
import {ButtonModule} from 'primeng/button';
import {ToolbarModule} from 'primeng/toolbar';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {SlideMenuModule} from 'primeng/slidemenu';
import {PanelMenuModule} from 'primeng/panelmenu';
import {TableModule} from 'primeng/table';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import {DropdownModule} from 'primeng/dropdown';
import {InputMaskModule} from 'primeng/inputmask';
import {FieldsetModule} from 'primeng/fieldset';
import {ProgressBarModule} from 'primeng/progressbar';
import {TooltipModule} from 'primeng/tooltip';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CalendarModule} from 'primeng/calendar';
import {KeyFilterModule} from 'primeng/keyfilter';
import {FocusTrapModule} from 'primeng/focustrap';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {TreeModule} from 'primeng/tree';
import {TreeTableModule} from 'primeng/treetable';
import {DialogModule} from 'primeng/dialog';

import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { DespesaFormComponent } from './component/despesa/despesa-form/despesa-form.component';
import { FornecedorListComponent } from './component/fornecedor/fornecedor-list/fornecedor-list.component';
import { CepPipe } from './pipe/cep.pipe';
import { CnpjPipe } from './pipe/cnpj.pipe';
import { FornecedorFormComponent } from './component/fornecedor/fornecedor-form/fornecedor-form.component';
import { TipoDespesaComponent } from './component/tipo-despesa/tipo-despesa.component';
import { FormaPagamentoComponent } from './component/forma-pagamento/forma-pagamento.component';
import { ContaListComponent } from './component/conta/conta-list/conta-list.component';
import { ContaFormComponent } from './component/conta/conta-form/conta-form.component';
import { DatebrPipe } from './pipe/datebr.pipe';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    DespesaListComponent,
    HomeComponent,
    DespesaFormComponent,
    FornecedorListComponent,
    CepPipe,
    CnpjPipe,
    FornecedorFormComponent,
    TipoDespesaComponent,
    FormaPagamentoComponent,
    ContaListComponent,
    ContaFormComponent,
    DatebrPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    MenubarModule,
    MegaMenuModule,
    MenuModule,
    ButtonModule,
    ToolbarModule,
    TieredMenuModule,
    SlideMenuModule,
    PanelMenuModule,
    TableModule,
    PanelModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    DropdownModule,
    InputMaskModule,
    FieldsetModule,
    ProgressBarModule,
    TooltipModule,
    InputNumberModule,
    InputTextareaModule,
    CalendarModule,
    KeyFilterModule,
    FocusTrapModule,
    ContextMenuModule,
    ConfirmDialogModule,
    AutoCompleteModule,
    TreeModule,
    TreeTableModule,
    DialogModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
