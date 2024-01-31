import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListdespesaComponent } from './listdespesa.component';

describe('ListdespesaComponent', () => {
  let component: ListdespesaComponent;
  let fixture: ComponentFixture<ListdespesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListdespesaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListdespesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
