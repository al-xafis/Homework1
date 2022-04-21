import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryControlComponent } from './add-category-control.component';

describe('AddCategoryControlComponent', () => {
  let component: AddCategoryControlComponent;
  let fixture: ComponentFixture<AddCategoryControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCategoryControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCategoryControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
