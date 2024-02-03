import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcontaComponent } from './listconta.component';

describe('ListcontaComponent', () => {
  let component: ListcontaComponent;
  let fixture: ComponentFixture<ListcontaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListcontaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListcontaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
