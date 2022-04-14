import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { Account } from '../accounts.model';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
})
export class AccountListComponent implements OnInit, OnDestroy {
  accounts!: Account[];
  accountsSubscription!: Subscription;
  selectedAccount!: Account;
  selectedAccountSubscription!: Subscription;

  constructor(private accountsService: AccountsService) {}

  ngOnInit(): void {
    this.accountsSubscription = this.accountsService
      .getAccounts()
      .subscribe((accounts: Account[]) => {
        this.accounts = accounts;
        this.accountsService.getAccountLength();
      });
    this.selectedAccountSubscription = this.accountsService
      .getSelectedAccount()
      .subscribe((account) => {
        this.selectedAccount = account;
      });
  }

  ngOnDestroy(): void {
    this.accountsSubscription.unsubscribe();
    this.selectedAccountSubscription.unsubscribe();
  }

  selectAccount(account: Account) {
    this.accountsService.selectAccount(account);
  }

  trackByFn(index: number, account: Account) {
    return account.amount;
  }
}
