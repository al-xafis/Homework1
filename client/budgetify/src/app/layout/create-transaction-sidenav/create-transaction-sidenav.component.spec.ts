import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTransactionSidenavComponent } from './create-transaction-sidenav.component';

describe('CreateTransactionSidenavComponent', () => {
  let component: CreateTransactionSidenavComponent;
  let fixture: ComponentFixture<CreateTransactionSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTransactionSidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTransactionSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
