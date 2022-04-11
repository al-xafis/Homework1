import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MainService } from 'src/app/main/main.service';
import { Account } from '../../accounts.model';

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

  constructor(private mainService: MainService) {}

  ngOnInit(): void {
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

  openAccountDetails() {
    this.mainService.openReadAccountSidebar();
  }
}
