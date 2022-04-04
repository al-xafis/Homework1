import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { Account } from '../accounts.model';
import { HttpClient } from '@angular/common/http';
import { map, publishReplay, refCount, tap } from 'rxjs';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
})
export class AccountListComponent implements OnInit {
  accounts: any;
  myadata: any;

  constructor(
    private accountsService: AccountsService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.accountsService.fetchAccounts().subscribe((accounts) => {
      this.accounts = accounts;
    });
  }
}
