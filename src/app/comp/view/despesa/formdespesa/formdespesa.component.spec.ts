import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormdespesaComponent } from './formdespesa.component';

describe('FormdespesaComponent', () => {
  let component: FormdespesaComponent;
  let fixture: ComponentFixture<FormdespesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormdespesaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormdespesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
