import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountCreateDialogComponent } from '../account-item/account-create-dialog/account-create-dialog.component';

@Component({
  selector: 'app-account-item-dummy',
  templateUrl: './account-item-dummy.component.html',
  styleUrls: ['./account-item-dummy.component.scss'],
})
export class AccountItemDummyComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog() {
    const dialogRef = this.dialog.open(AccountCreateDialogComponent);
  }
}
