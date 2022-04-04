import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountItemDummyComponent } from './account-item-dummy.component';

describe('AccountItemDummyComponent', () => {
  let component: AccountItemDummyComponent;
  let fixture: ComponentFixture<AccountItemDummyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountItemDummyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountItemDummyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
