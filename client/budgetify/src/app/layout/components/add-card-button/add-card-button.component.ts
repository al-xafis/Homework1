import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AccountCreateDialogComponent } from 'src/app/accounts/account-list/account-item/account-create-dialog/account-create-dialog.component';
import { AccountsService } from 'src/app/accounts/accounts.service';

@Component({
  selector: 'app-add-card-button',
  templateUrl: './add-card-button.component.html',
  styleUrls: ['./add-card-button.component.scss'],
})
export class AddCardButtonComponent implements OnInit, OnDestroy {
  accountLength!: number;
  lengthSubscription!: Subscription;
  constructor(
    public dialog: MatDialog,
    private accountService: AccountsService
  ) {}

  ngOnInit(): void {
    this.lengthSubscription = this.accountService.accountsLength.subscribe(
      (data: number) => {
        this.accountLength = data;
      }
    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(AccountCreateDialogComponent);
  }

  ngOnDestroy(): void {
    this.lengthSubscription.unsubscribe();
  }
}
