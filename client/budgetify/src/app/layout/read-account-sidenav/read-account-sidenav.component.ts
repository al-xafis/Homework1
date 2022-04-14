import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Account } from 'src/app/accounts/accounts.model';
import { AccountsService } from 'src/app/accounts/accounts.service';
import { MainService } from 'src/app/main/main.service';

@Component({
  selector: 'app-read-account-sidenav',
  templateUrl: './read-account-sidenav.component.html',
  styleUrls: ['./read-account-sidenav.component.scss'],
})
export class ReadAccountSidenavComponent implements OnInit, OnDestroy {
  account!: Account;
  currency!: string;
  accountSub!: Subscription;
  constructor(
    private mainService: MainService,
    private accountService: AccountsService
  ) {}

  ngOnInit(): void {
    this.accountSub = this.accountService
      .getSelectedAccount()
      .subscribe((acc) => {
        this.account = acc;
        switch (this.account.currency) {
          case 'USD':
            this.currency = 'USD ($)';
            break;
          case 'EUR':
            this.currency = 'EUR (€)';
            break;
          case 'RUB':
            this.currency = 'RUB (₽)';
            break;
          case 'BYN':
            this.currency = 'BYN (Br)';
            break;
        }
      });
  }

  closeSidebar() {
    this.mainService.closeReadAccountSidebar();
  }

  ngOnDestroy(): void {
    this.accountSub.unsubscribe();
  }
}
