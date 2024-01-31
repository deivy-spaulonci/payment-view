import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListfornecedorComponent } from './listfornecedor.component';

describe('ListfornecedorComponent', () => {
  let component: ListfornecedorComponent;
  let fixture: ComponentFixture<ListfornecedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListfornecedorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListfornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
