import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import Decimal from 'decimal.js';
import {
  BehaviorSubject,
  catchError,
  delay,
  retry,
  share,
  shareReplay,
  Subject,
  tap,
} from 'rxjs';
import { Account } from '../accounts/accounts.model';
import { AccountsService } from '../accounts/accounts.service';
import { Transaction } from './transactions.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  url = 'http://localhost:3000/transaction';
  transactions: Transaction[] = [];
  transactionsChanged$ = new BehaviorSubject<Transaction[]>([]);
  transactionLength = new Subject<number>();
  selectedTransaction$: Subject<Transaction> = new BehaviorSubject<Transaction>(
    {} as Transaction
  );

  user = JSON.parse(localStorage.getItem('user') ?? '');

  constructor(
    private http: HttpClient,
    private accountsService: AccountsService,
    private _snackBar: MatSnackBar
  ) {}

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  openSnackBar(message: string) {
    this._snackBar.open(message, 'X', {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: 'white-snackbar',
    });
  }

  createTransaction(newTransaction: Transaction) {
    const {
      accountTitle,
      type,
      title,
      category,
      description,
      amount,
      payee,
      date,
    } = newTransaction;
    let queryParams = new HttpParams()
      .append('email', String(this.user.email))
      .append('accountTitle', String(accountTitle));
    this.http
      .post<Transaction>(
        this.url,
        { type, title, category, description, amount, payee, date },
        { params: queryParams }
      )
      .pipe(
        tap((data) => {
          this.transactions.push(data);
          this.transactionsChanged$.next(this.transactions.slice());
          this.transactionLength.next(this.transactions.length);
        })
      )
      .subscribe(() => {
        this.openSnackBar('Transaction added successfully');
      });
    return this.transactionsChanged$.asObservable();
  }

  getTransactions(accountTitle: string) {
    let queryParams = new HttpParams()
      .append('email', String(this.user.email))
      .append('accountTitle', String(accountTitle));

    this.http
      .get<Transaction[]>(this.url, {
        params: queryParams,
      })
      .pipe(
        tap((data) => {
          this.transactions = data.slice();
          this.transactionsChanged$.next(this.transactions.slice());
          this.transactionLength.next(this.transactions.length);
          this.oldTransactions = data.slice();
        })
      )
      .subscribe();
    return this.transactionsChanged$.asObservable();
  }

  editTransaction(newTransaction: Transaction) {
    let queryParams = new HttpParams()
      .append('email', String(this.user.email))
      .append('accountTitle', String(newTransaction.accountTitle));
    this.http
      .put<Transaction>(this.url + '/' + newTransaction._id, newTransaction, {
        params: queryParams,
      })
      .pipe(
        tap((data) => {
          // console.log(data);

          let transaction = this.transactions.find((trans) => {
            return trans._id === newTransaction._id;
          });

          let newTrans: Transaction[] = this.transactions.map((transaction) => {
            if (transaction._id === data._id) {
              return data;
            }
            return transaction;
          });
          this.transactions = newTrans;
          this.transactionsChanged$.next(newTrans.slice());

          let newAccounts = this.accountsService.accounts.map((account) => {
            if (account.title === newTransaction.accountTitle) {
              if (transaction?.type === newTransaction.type) {
                if (newTransaction.type === 'Expense') {
                  account.amount = new Decimal(account.amount!)
                    .plus(transaction.amount)
                    .toNumber();
                  account.amount = new Decimal(account.amount)
                    .minus(newTransaction.amount)
                    .toNumber();
                } else if (newTransaction.type === 'Income') {
                  account.amount = new Decimal(account.amount!)
                    .minus(transaction.amount)
                    .toNumber();
                  account.amount = new Decimal(account.amount)
                    .plus(newTransaction.amount)
                    .toNumber();
                }
              } else {
                if (newTransaction.type === 'Expense') {
                  account.amount = new Decimal(account.amount!)
                    .minus(transaction!.amount)
                    .toNumber();
                  account.amount = new Decimal(account.amount)
                    .minus(newTransaction.amount)
                    .toNumber();
                } else if (newTransaction.type === 'Income') {
                  account.amount = new Decimal(account.amount!)
                    .plus(transaction!.amount)
                    .toNumber();
                  account.amount = new Decimal(account.amount)
                    .plus(newTransaction.amount)
                    .toNumber();
                }
              }
            }
            return account;
          });
          this.accountsService.accountsChanged$.next(newAccounts);
        })
      )
      .subscribe(() => {
        this.openSnackBar('Transaction updated successfully');
      });
    return this.transactionsChanged$.asObservable();
  }

  deleteTransaction(newTransaction: Transaction) {
    let queryParams = new HttpParams()
      .append('email', String(this.user.email))
      .append('accountTitle', String(newTransaction.accountTitle));
    this.http
      .delete<Transaction>(this.url + '/' + newTransaction._id, {
        params: queryParams,
      })
      .pipe(
        tap((data) => {
          this.transactions = this.transactions.filter(
            (transaction) => transaction._id !== newTransaction._id
          );
          this.transactionsChanged$.next(this.transactions.slice());
          this.transactionLength.next(this.transactions.length);
          let newAccounts = this.accountsService.accounts.map((account) => {
            if (account.title === newTransaction.accountTitle) {
              if (newTransaction.type === 'Income') {
                account.amount! -= newTransaction.amount;
              } else if (newTransaction.type === 'Expense') {
                account.amount! += newTransaction.amount;
              }
            }
            return account;
          });
          this.accountsService.accountsChanged$.next(newAccounts);
        })
      )
      .subscribe(() => this.openSnackBar('Transaction deleted successfully'));
    return this.transactionsChanged$.asObservable();
  }

  getTransactionLength() {
    this.transactionLength.next(this.transactions.length);
  }

  searchTransaction(str: string) {
    const filteredTransactions = this.transactions.filter((transaction) =>
      transaction.title?.toLowerCase().includes(str)
    );
    this.transactionsChanged$.next(filteredTransactions);
  }

  selectTransaction(transaction: Transaction) {
    this.selectedTransaction$.next(transaction);
  }

  getSelectedTransction() {
    return this.selectedTransaction$.asObservable();
  }

  showFilter: boolean = false;

  filterIncome() {
    if (this.showFilter === false) {
      let filteredTransactions = this.transactions.filter((transaction) => {
        return transaction.type === 'Income';
      });
      this.transactionsChanged$.next(filteredTransactions.slice());
      this.showFilter = !this.showFilter;
    } else {
      this.transactionsChanged$.next(this.oldTransactions.slice());
      this.showFilter = !this.showFilter;
    }
  }

  filterExpense() {
    if (this.showFilter === false) {
      let filteredTransactions = this.transactions.filter((transaction) => {
        return transaction.type === 'Expense';
      });
      this.transactionsChanged$.next(filteredTransactions.slice());
      this.showFilter = !this.showFilter;
    } else {
      this.transactionsChanged$.next(this.oldTransactions.slice());
      this.showFilter = !this.showFilter;
    }
  }

  oldTransactions!: Transaction[];
  sort: boolean = true;

  sortByDate() {
    if (this.sort === true) {
      let sortedTransactions = this.transactions.sort(
        (a: Transaction, b: Transaction) => {
          if (a.date < b.date) {
            return -1;
          } else if (a.date > b.date) {
            return 1;
          } else {
            return 0;
          }
        }
      );
      this.transactionsChanged$.next(sortedTransactions.slice());
      this.sort = !this.sort;
    } else {
      this.transactionsChanged$.next(this.oldTransactions.slice());
      this.sort = !this.sort;
    }
  }
}
