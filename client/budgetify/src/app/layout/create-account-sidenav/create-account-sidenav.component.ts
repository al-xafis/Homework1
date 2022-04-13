import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AccountsService } from 'src/app/accounts/accounts.service';
import { MainService } from 'src/app/main/main.service';

@Component({
  selector: 'app-create-account-sidenav',
  templateUrl: './create-account-sidenav.component.html',
  styleUrls: ['./create-account-sidenav.component.scss'],
})
export class CreateAccountSidenavComponent implements OnInit, OnDestroy {
  accountCreateForm!: FormGroup;
  createSubscription!: Subscription;

  constructor(
    private mainService: MainService,
    private accountsService: AccountsService
  ) {}

  ngOnInit(): void {
    this.accountCreateForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.maxLength(128),
      ]),
      currency: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.maxLength(256)),
    });
  }

  onSubmit() {
    const { value } = this.accountCreateForm;
    const newAccount = {
      title: value.title,
      currency: value.currency,
      description: value.description,
    };

    if (this.accountCreateForm.valid) {
      this.createSubscription = this.accountsService
        .createAccount(newAccount)
        .subscribe((data) => {
          this.accountCreateForm.reset();
          this.closeSidebar();
        });
    }
  }

  sidebarOpen() {
    this.mainService.accountCreateSidebarOpen();
  }

  closeSidebar() {
    this.mainService.accountCreateSidebarClose();
  }

  ngOnDestroy(): void {
    if (this.createSubscription) {
      this.createSubscription.unsubscribe();
    }
  }
}
