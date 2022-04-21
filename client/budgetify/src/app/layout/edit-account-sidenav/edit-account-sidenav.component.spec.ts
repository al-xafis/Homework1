import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccountSidenavComponent } from './edit-account-sidenav.component';

describe('EditAccountSidenavComponent', () => {
  let component: EditAccountSidenavComponent;
  let fixture: ComponentFixture<EditAccountSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAccountSidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAccountSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
