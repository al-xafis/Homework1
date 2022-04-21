import { Component, OnInit } from '@angular/core';
import {
  catchError,
  delay,
  exhaustMap,
  map,
  Observable,
  of,
  retry,
  switchMap,
  take,
  takeUntil,
  takeWhile,
  tap,
} from 'rxjs';
import { Account } from 'src/app/accounts/accounts.model';
import { AccountsService } from 'src/app/accounts/accounts.service';
import { Transaction } from '../transactions.model';
import { TransactionsService } from '../transactions.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] | null = [];
  selectedAccount!: Account;
  title!: string;

  constructor(
    private transactionService: TransactionsService,
    private accountService: AccountsService
  ) {}

  ngOnInit(): void {
    this.accountService
      .getSelectedAccount()
      .pipe(
        switchMap((account) => {
          this.selectedAccount = account;
          if (account) {
            return this.transactionService.getTransactions(account?.title);
          }
          return of(null);
        })
      )
      .subscribe((transactions: Transaction[] | null) => {
        this.transactions = transactions;
      });
  }
  // trackByFn(index: number, transaction: Transaction) {
  //   return transaction.amount;
  // }
}
