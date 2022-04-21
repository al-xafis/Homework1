import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeSortComponent } from './income-sort.component';

describe('IncomeSortComponent', () => {
  let component: IncomeSortComponent;
  let fixture: ComponentFixture<IncomeSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeSortComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
