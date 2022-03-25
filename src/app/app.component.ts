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
        routerLink: ['/despesa-list']
      },
      {
        label: 'Conta',
        icon: 'pi pi-fw pi-dollar'
      },
      {
        label: 'Fornecedor',
        icon: 'pi pi-fw pi-box'
      },
      // {
      //   label: 'Edit',
      //   icon: 'pi pi-fw pi-pencil',
      //   items: [
      //     {label: 'Delete', icon: 'pi pi-fw pi-trash'},
      //     {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
      //   ]
      // }
    ];
  }
}
