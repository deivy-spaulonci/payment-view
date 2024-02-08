import {Component, OnInit} from '@angular/core';
import {MenuItem, PrimeNGConfig} from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit {
  title = 'payment-view';
  items: MenuItem[] | undefined;
  activeIndex: number = 2;

  constructor(private config: PrimeNGConfig) {
  }

  ngOnInit(): void {

    this.config.setTranslation({
      accept: 'Ok',
      reject: 'Cancelar',
      apply: 'Aplicar',
      clear: 'Limpar'
      //translations
    });

    this.items = [
      {label: 'Despesas',icon: 'pi pi-fw pi-dollar',routerLink: ['/despesa'],},
      {label: 'Contas',icon: 'pi pi-fw pi-credit-card',routerLink: ['/listConta'],},
      {label: 'Fornecedores',icon: 'pi pi-fw pi-box',routerLink: ['/fornecedor']},
    ];
  }
}
