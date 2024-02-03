import {Component, OnInit} from '@angular/core';
import {MenuItem, PrimeNGConfig} from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit {
  title = 'payment-view';
  // items: MenuItem[] | undefined;
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

  //   this.items = [
  //     {
  //       label: 'Despesas',
  //       icon: 'pi pi-fw pi-dollar',
  //       items: [
  //         {
  //           label: 'Despesas',
  //           icon: 'pi pi-fw pi-arrow-right',
  //           routerLink: ['/despesa']
  //         },
  //         {
  //           label: 'Tipo Despesas',
  //           icon: 'pi pi-fw pi-arrow-right'
  //         }
  //       ]
  //     },
  //     {
  //       label: 'Contas',
  //       icon: 'pi pi-fw pi-credit-card',
  //       items: [
  //         {
  //           label: 'Contas',
  //           icon: 'pi pi-fw pi-arrow-right',
  //           routerLink: ['/conta']
  //         },
  //         {
  //           label: 'Tipo Contas',
  //           icon: 'pi pi-fw pi-arrow-right'
  //         }
  //       ]
  //     },
  //     {
  //       label: 'Fornecedores',
  //       icon: 'pi pi-fw pi-box',
  //       routerLink: ['/fornecedor']
  //     },
  //   ];
  }
}
