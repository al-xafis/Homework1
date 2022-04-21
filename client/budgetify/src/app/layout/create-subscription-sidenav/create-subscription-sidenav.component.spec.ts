import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubscriptionSidenavComponent } from './create-subscription-sidenav.component';

describe('CreateSubscriptionSidenavComponent', () => {
  let component: CreateSubscriptionSidenavComponent;
  let fixture: ComponentFixture<CreateSubscriptionSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSubscriptionSidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSubscriptionSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
