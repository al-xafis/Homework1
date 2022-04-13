import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AccountsService } from '../accounts/accounts.service';
import { MainService } from '../main/main.service';
import { TransactionsService } from '../transactions/transactions.service';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss'],
})
export class FirstComponent implements OnInit, OnDestroy {
  @Input() addTransaction: string = 'Add Transaction';
  @Input() addAccount: string = 'Add Account';

  accountLength!: number;
  lengthSubscription!: Subscription;
  transactionLength!: number;
  transactionLengthSubscription!: Subscription;

  open!: boolean;
  sidebarSubscription!: Subscription;

  accountCreateOpen!: boolean;
  sidebarAccCreateSub!: Subscription;

  accountReadOpen!: boolean;
  sidebarAccReadSub!: Subscription;

  transactionReadOpen!: boolean;
  sidebarTrReadSub!: Subscription;

  constructor(
    private accountService: AccountsService,
    public dialog: MatDialog,
    private mainService: MainService,
    private transactionService: TransactionsService
  ) {}

  ngOnInit(): void {
    this.lengthSubscription = this.accountService.accountsLength.subscribe(
      (data: number) => {
        this.accountLength = data;
      }
    );
    this.sidebarSubscription = this.mainService
      .sidebarState()
      .subscribe((open) => {
        this.open = open;
      });

    this.sidebarAccCreateSub = this.mainService
      .accountCreateSidebarState()
      .subscribe((open) => {
        this.accountCreateOpen = open;
      });

    this.sidebarAccReadSub = this.mainService
      .accountReadSidebarState()
      .subscribe((open) => {
        this.accountReadOpen = open;
      });

    this.sidebarTrReadSub = this.mainService
      .transactionReadSidebarState()
      .subscribe((open) => {
        this.transactionReadOpen = open;
      });

    this.transactionService.transactionLength.subscribe((length) => {
      this.transactionLength = length;
    });
  }

  openSidebar() {
    this.mainService.sidebarOpen();
  }

  openAccCreateSidebar() {
    this.mainService.accountCreateSidebarOpen();
  }

  closeSidebar() {
    this.mainService.sidebarClose();
  }

  closeAccCreateSidebar() {
    this.mainService.accountCreateSidebarClose();
  }

  closeAccReadSidebar() {
    this.mainService.closeReadAccountSidebar();
  }

  closeTrReadSidebar() {
    this.mainService.closeTransactionReadSidebar();
  }

  ngOnDestroy(): void {
    this.lengthSubscription.unsubscribe();
    this.sidebarSubscription.unsubscribe();
    this.sidebarAccCreateSub.unsubscribe();
    this.sidebarAccReadSub.unsubscribe();
    this.sidebarTrReadSub.unsubscribe();
  }
}
