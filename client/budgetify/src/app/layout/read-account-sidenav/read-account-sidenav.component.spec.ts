import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadAccountSidenavComponent } from './read-account-sidenav.component';

describe('ReadAccountSidenavComponent', () => {
  let component: ReadAccountSidenavComponent;
  let fixture: ComponentFixture<ReadAccountSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadAccountSidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadAccountSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
