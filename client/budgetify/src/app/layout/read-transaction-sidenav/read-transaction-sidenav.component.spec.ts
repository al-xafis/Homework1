import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadTransactionSidenavComponent } from './read-transaction-sidenav.component';

describe('ReadTransactionSidenavComponent', () => {
  let component: ReadTransactionSidenavComponent;
  let fixture: ComponentFixture<ReadTransactionSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadTransactionSidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadTransactionSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
