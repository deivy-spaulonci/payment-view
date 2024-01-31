import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormfornecedorComponent } from './formfornecedor.component';

describe('FormfornecedorComponent', () => {
  let component: FormfornecedorComponent;
  let fixture: ComponentFixture<FormfornecedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormfornecedorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormfornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
