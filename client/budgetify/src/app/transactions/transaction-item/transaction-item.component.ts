import { Component, Input, OnInit } from '@angular/core';
import { Account } from 'src/app/accounts/accounts.model';
import { MainService } from 'src/app/main/main.service';
import { Transaction } from '../transactions.model';
import { TransactionsService } from '../transactions.service';

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss'],
})
export class TransactionItemComponent implements OnInit {
  @Input() transaction!: Transaction;
  @Input() selectedAccount!: Account;
  currency!: string;
  amount!: string;
  constructor(
    private mainService: MainService,
    private transactionService: TransactionsService
  ) {}

  ngOnInit(): void {
    this.amount = this.numberWithCommas(this.transaction.amount);
    switch (this.selectedAccount.currency) {
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
  }

  numberWithCommas(amount: number) {
    let formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    return formatter.format(amount).replace('$', '');
  }

  openTransactionDetails() {
    this.mainService.openTransactionReadSidebar();
    this.transactionService.selectTransaction(this.transaction);
  }
}
