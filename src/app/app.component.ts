import { Component } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'payment-view';

  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/']
      },
      {
        label: 'Despesa',
        icon: 'pi pi-fw pi-money-bill',
        items: [
          {label: 'Cadastro', routerLink: ['/despesa-form'], icon: 'pi pi-fw pi-plus-circle'},
          {label: 'Consulta', routerLink: ['/despesa-list'], icon: 'pi pi-fw pi-bars'},
          {label: 'Tipo Despesa', routerLink: ['/tipo-despesa'], icon: 'pi pi-fw pi-chevron-circle-right'},
        ]
      },
      {
        label: 'Conta',
        icon: 'pi pi-fw pi-dollar',
        items: [
          {label: 'Cadastro', routerLink: ['/conta-form'], icon: 'pi pi-fw pi-plus-circle'},
          {label: 'Consulta', routerLink: ['/conta-list'], icon: 'pi pi-fw pi-bars'},
        ]
      },
      {
        label: 'Fornecedor',
        icon: 'pi pi-fw pi-box',
        items: [
          {label: 'Cadastro', routerLink: ['/fornecedor-form'], icon: 'pi pi-fw pi-plus-circle'},
          {label: 'Consulta', routerLink: ['/fornecedor-list'], icon: 'pi pi-fw pi-bars'},
        ]
      },
      {
        label: 'Forma Pagamento',
        icon: 'pi pi-fw pi-credit-card',
        routerLink: ['/forma-pagamento']
      },
    ];
  }
}
