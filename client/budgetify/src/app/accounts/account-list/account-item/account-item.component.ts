import { Component, OnInit, Input } from '@angular/core';
import { MainService } from 'src/app/main/main.service';
import { Account } from '../../accounts.model';
import { AccountsService } from '../../accounts.service';

@Component({
  selector: 'app-account-item',
  templateUrl: './account-item.component.html',
  styleUrls: ['./account-item.component.scss'],
})
export class AccountItemComponent implements OnInit {
  @Input() account!: Account;
  @Input() accountLength!: number;
  @Input() selectedAccount!: Account;
  currency!: string;
  amount!: string;

  constructor(
    private mainService: MainService,
    private accountsService: AccountsService
  ) {}

  ngOnInit(): void {
    this.amount = this.numberWithCommas(this.account.amount!);
    switch (this.account.currency) {
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
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  openAccountDetails() {
    this.mainService.openReadAccountSidebar();
  }
}
