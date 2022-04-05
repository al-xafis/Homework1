import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountCreateDialogComponent } from './account-create-dialog/account-create-dialog.component';
import { Account } from '../../accounts.model';

@Component({
  selector: 'app-account-item',
  templateUrl: './account-item.component.html',
  styleUrls: ['./account-item.component.scss'],
})
export class AccountItemComponent implements OnInit {
  @Input() account!: Account;
  @Input() accountLength!: number;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog() {
    const dialogRef = this.dialog.open(AccountCreateDialogComponent);
  }
}
