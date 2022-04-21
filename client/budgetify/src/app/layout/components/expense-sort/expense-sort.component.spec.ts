import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseSortComponent } from './expense-sort.component';

describe('ExpenseSortComponent', () => {
  let component: ExpenseSortComponent;
  let fixture: ComponentFixture<ExpenseSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseSortComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
