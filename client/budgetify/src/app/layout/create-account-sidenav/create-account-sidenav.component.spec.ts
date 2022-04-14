import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountSidenavComponent } from './create-account-sidenav.component';

describe('CreateAccountSidenavComponent', () => {
  let component: CreateAccountSidenavComponent;
  let fixture: ComponentFixture<CreateAccountSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAccountSidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
