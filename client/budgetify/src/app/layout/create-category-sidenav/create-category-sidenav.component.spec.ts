import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategorySidenavComponent } from './create-category-sidenav.component';

describe('CreateCategorySidenavComponent', () => {
  let component: CreateCategorySidenavComponent;
  let fixture: ComponentFixture<CreateCategorySidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCategorySidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCategorySidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
