import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormcontaComponent } from './formconta.component';

describe('FormcontaComponent', () => {
  let component: FormcontaComponent;
  let fixture: ComponentFixture<FormcontaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormcontaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormcontaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
