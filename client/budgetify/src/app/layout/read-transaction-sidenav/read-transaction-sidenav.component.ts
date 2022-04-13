import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Account } from 'src/app/accounts/accounts.model';
import { AccountsService } from 'src/app/accounts/accounts.service';
import { MainService } from 'src/app/main/main.service';
import { Transaction } from 'src/app/transactions/transactions.model';
import { TransactionsService } from 'src/app/transactions/transactions.service';

@Component({
  selector: 'app-read-transaction-sidenav',
  templateUrl: './read-transaction-sidenav.component.html',
  styleUrls: ['./read-transaction-sidenav.component.scss'],
})
export class ReadTransactionSidenavComponent implements OnInit, OnDestroy {
  transaction!: Transaction;
  transactionSub!: Subscription;
  selectedAccount!: Account;
  currency!: string;
  amount!: string;

  constructor(
    private transactionService: TransactionsService,
    private mainService: MainService,
    private accountService: AccountsService
  ) {}

  ngOnInit(): void {
    this.transactionSub = this.transactionService
      .getSelectedTransction()
      .subscribe((transaction) => {
        this.transaction = transaction;
        console.log(transaction);
      });

    this.accountService.getSelectedAccount().subscribe((acc) => {
      this.currency = acc?.currency;
      switch (this.currency) {
        case 'USD':
          this.currency = '$';
          break;
        case 'EUR':
          this.currency = '€';
          break;
        case 'RUB':
          this.currency = '₽';
          break;
        case 'BYN':
          this.currency = 'Br';
          break;
      }
    });
    this.amount = this.numberWithCommas(this.transaction.amount);
  }

  numberWithCommas(amount: number) {
    let formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    return formatter.format(amount).replace('$', '');
  }

  closeSidebar() {
    this.mainService.closeTransactionReadSidebar();
  }

  ngOnDestroy(): void {
    this.transactionSub.unsubscribe();
  }
}
