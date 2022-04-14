import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionItemComponent } from './transaction-item/transaction-item.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TransactionListComponent, TransactionItemComponent],
  imports: [CommonModule, SharedModule],
  exports: [TransactionListComponent, TransactionItemComponent],
})
export class TransactionsModule {}
