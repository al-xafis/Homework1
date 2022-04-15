import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Account } from './accounts.model';
import { BehaviorSubject, Observable, Subject, tap, switchMap } from 'rxjs';
import { delay } from 'rxjs/operators';

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
  selectedAccount$: Subject<Account> = new BehaviorSubject<Account>(
    this.accounts[0]
  );

  selectAccount(account: Account) {
    this.selectedAccount$.next(account);
  }

  getSelectedAccount() {
    return this.selectedAccount$.asObservable();
  }

  constructor(private http: HttpClient) {}

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
      .subscribe();
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

  getAccountLength() {
    this.accountsLength.next(this.accounts.length);
  }
}
