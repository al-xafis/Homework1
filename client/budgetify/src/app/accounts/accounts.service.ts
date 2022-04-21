import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Account } from './accounts.model';
import { BehaviorSubject, Observable, Subject, tap, switchMap } from 'rxjs';
import { delay } from 'rxjs/operators';
import { TransactionsService } from '../transactions/transactions.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  url = 'http://localhost:3000/account/';
  user = JSON.parse(localStorage.getItem('user') ?? '{}');
  queryParams = new HttpParams().append('email', String(this.user.email));

  accounts: Account[] = [];
  accountsLength = new Subject<number>();
  accountsChanged$: Subject<Account[]> = new BehaviorSubject<Account[]>([
    ...this.accounts,
  ]);
  selectedAccount$ = new BehaviorSubject<Account>(this.accounts[0]);

  selectAccount(account: Account) {
    this.selectedAccount$.next(account);
  }

  getSelectedAccount() {
    return this.selectedAccount$.asObservable();
  }

  private tempService: any;
  constructor(
    private http: HttpClient,
    private injector: Injector,
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

  public onAccDelete() {
    this.tempService = this.injector.get(TransactionsService);
    this.tempService.transactionsChanged$.next([]);
    this.tempService.transactionLength.next(0);
  }

  createAccount(newAccount: Account) {
    const { title, currency, description } = newAccount;
    this.http
      .post<Account>(
        this.url,
        {
          title,
          currency,
          description,
        },
        { params: this.queryParams }
      )
      .pipe(
        tap((data) => {
          console.log(data);
          this.accounts.push({
            title,
            amount: 0,
            currency,
            description,
          });
          this.accountsChanged$.next(this.accounts.slice());
          if (this.accounts.length === 1) {
            this.selectedAccount$.next(this.accounts[0]);
          }
        })
      )
      .subscribe(() => this.openSnackBar('Account created successfully'));
    return this.accountsChanged$.asObservable();
  }

  getAccounts() {
    this.http
      .get<Account[]>(this.url, { params: this.queryParams })
      .pipe(
        tap((data) => {
          this.accounts = data;
          this.accountsChanged$.next(this.accounts.slice());
          this.selectedAccount$.next(this.accounts.slice()[0]);
        })
      )
      .subscribe();
    return this.accountsChanged$.asObservable();
  }

  editAccount(newAccount: Account, oldTitle: string) {
    this.http
      .put<Account[]>(this.url + '/' + oldTitle, newAccount, {
        params: this.queryParams,
      })
      .pipe(
        tap((data) => {
          let oldAccID = this.selectedAccount$.value._id;
          this.accounts = data;
          this.accountsChanged$.next(this.accounts.slice());
          let idx = this.accounts.findIndex((account) => {
            return account._id === oldAccID;
          });
          console.log(this.accounts);
          this.selectedAccount$.next(this.accounts[idx]);
        })
      )
      .subscribe(() => this.openSnackBar('Account updated successfully'));
    return this.accountsChanged$.asObservable();
  }

  deleteAccount(account: Account) {
    this.http
      .delete<Account[]>(this.url + '/' + account.title, {
        params: this.queryParams,
      })
      .pipe(
        tap((data) => {
          this.accounts = data;
          console.log(data);
          this.accountsChanged$.next(this.accounts.slice());
          this.onAccDelete();
        })
      )
      .subscribe(() => this.openSnackBar('Account deleted successfully'));
    return this.accountsChanged$.asObservable();
  }

  getAccountLength() {
    this.accountsLength.next(this.accounts.length);
  }
}
