import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTransactionSidenavComponent } from './edit-transaction-sidenav.component';

describe('EditTransactionSidenavComponent', () => {
  let component: EditTransactionSidenavComponent;
  let fixture: ComponentFixture<EditTransactionSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTransactionSidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTransactionSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
