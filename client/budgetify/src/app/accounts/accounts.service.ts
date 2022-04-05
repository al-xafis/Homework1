import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from './accounts.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private accounts: any = [];

  constructor(private http: HttpClient) {}

  createAccount(title: string, currency: string, description: string) {
    return this.http.post<Account>(
      'http://localhost:3000/account/alhafiz@mail.ru',
      {
        title,
        currency,
        description,
      }
    );
  }

  fetchAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(
      'http://localhost:3000/account/alhafiz@mail.ru'
    );
  }
}
