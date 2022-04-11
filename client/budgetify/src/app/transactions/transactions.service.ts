import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, retry, Subject, tap } from 'rxjs';
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
  user = JSON.parse(localStorage.getItem('user') ?? '');

  constructor(private http: HttpClient) {}

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
          console.log(data);
          this.transactions.push(newTransaction);
          this.transactionsChanged$.next(this.transactions.slice());
          this.transactionLength.next(this.transactions.length);
        })
      )
      .subscribe();
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
          this.transactions = data;
          this.transactionsChanged$.next(this.transactions.slice());
          this.transactionLength.next(this.transactions.length);
        })
      )
      .subscribe();
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
}
