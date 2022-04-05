import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsComponent } from './accounts.component';
import { AccountItemComponent } from './account-list/account-item/account-item.component';
import { AccountListComponent } from './account-list/account-list.component';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { AccountCreateDialogComponent } from './account-list/account-item/account-create-dialog/account-create-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { AccountItemDummyComponent } from './account-list/account-item-dummy/account-item-dummy.component';

@NgModule({
  declarations: [
    AccountsComponent,
    AccountListComponent,
    AccountItemComponent,
    AccountCreateDialogComponent,
    AccountItemDummyComponent,
  ],
  imports: [CommonModule, SharedModule, MatDialogModule, MatSelectModule],
  exports: [AccountsComponent, AccountListComponent, AccountItemComponent],
})
export class AccountsModule {}
